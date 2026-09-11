import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Port configuration:
// - In Google AI Studio Cloud Run sandboxes (APPLET_ID set), binds to 3000 for container ingress.
// - In external production hosting (Hostinger Node.js, VPS, etc.), listens on process.env.PORT (falling back to 3000).
const PORT = process.env.APPLET_ID ? 3000 : (process.env.PORT ? Number(process.env.PORT) || 3000 : 3000);

// Body parsing middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Target SureForms configuration
const TARGET_SUREFORMS_ID = parseInt(process.env.SUREFORMS_FORM_ID || '1591', 10);
const WORDPRESS_BASE_URL = (process.env.WORDPRESS_URL || 'https://thermogenprojects.com').replace(/\/$/, '');
const WORDPRESS_INQUIRY_ENDPOINT =
  process.env.WORDPRESS_INQUIRY_ENDPOINT || `${WORDPRESS_BASE_URL}/wp-json/tppl/v1/contact`;

// ========================================================================
// API ROUTES
// ========================================================================

// 1. Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Thermogen Projects Web Service',
    wordpress_endpoint: WORDPRESS_INQUIRY_ENDPOINT,
    sureforms_form_id: TARGET_SUREFORMS_ID,
  });
});

// 2. Photo upload endpoint (supporting existing upload functionality)
app.post('/api/upload-photo', (req: Request, res: Response) => {
  try {
    const { filename, dataUrl } = req.body;
    if (filename && dataUrl) {
      const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const targetPath = path.join(process.cwd(), 'public', filename);
      fs.writeFileSync(targetPath, buffer);
      return res.json({ success: true, path: '/' + filename });
    }
    return res.status(400).json({ success: false, error: 'Invalid payload' });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Upload failed';
    return res.status(500).json({ success: false, error: errorMessage });
  }
});

// 3. Contact / Inquiry Form Submission Endpoint -> WordPress SureForms Bridge
app.post('/api/contact', async (req: Request, res: Response) => {
  const {
    name,
    email,
    phone,
    company = '',
    service = 'Industrial Combustion Systems',
    message,
    website, // Honeypot field for bot detection
  } = req.body;

  // SPAM PROTECTION: Honeypot check
  // Hidden from real users; automated bots typically fill every input
  if (website && String(website).trim() !== '') {
    console.warn('[Contact API] Spam detected via honeypot field. Discarding silently.');
    return res.status(200).json({
      success: true,
      message: 'Thank you. Your inquiry has been submitted successfully.',
    });
  }

  // SERVER-SIDE VALIDATION
  const trimmedName = typeof name === 'string' ? name.trim() : '';
  const trimmedEmail = typeof email === 'string' ? email.trim() : '';
  const trimmedPhone = typeof phone === 'string' ? phone.trim() : '';
  const trimmedCompany = typeof company === 'string' ? company.trim() : '';
  const trimmedService = typeof service === 'string' ? service.trim() : 'General Inquiry';
  const trimmedMessage = typeof message === 'string' ? message.trim() : '';

  if (!trimmedName || trimmedName.length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid contact name (minimum 2 characters).',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid business email address.',
    });
  }

  if (!trimmedPhone || trimmedPhone.length < 6) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid phone number (minimum 6 digits).',
    });
  }

  if (!trimmedMessage || trimmedMessage.length < 5) {
    return res.status(400).json({
      success: false,
      error: 'Please provide project scope or inquiry details (minimum 5 characters).',
    });
  }

  // PREPARE PAYLOAD FOR WORDPRESS SUREFORMS BRIDGE
  // Exact field mapping to SureForms Form 1591
  const payload = {
    form_id: TARGET_SUREFORMS_ID,
    name: trimmedName,
    email: trimmedEmail,
    phone: trimmedPhone,
    company: trimmedCompany,
    service: trimmedService,
    message: trimmedMessage,
    website: '',
  };

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'User-Agent': 'ThermogenProjects-AIStudio-Bridge/1.0',
    'Accept': 'application/json',
  };

  if (process.env.WORDPRESS_BRIDGE_KEY) {
    headers['X-TPPL-Bridge-Key'] = process.env.WORDPRESS_BRIDGE_KEY.trim();
  }

  console.log(`[Contact API] Dispatching inquiry to WordPress SureForms bridge at: ${WORDPRESS_INQUIRY_ENDPOINT}`);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    const wpResponse = await fetch(WORDPRESS_INQUIRY_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const contentType = wpResponse.headers.get('content-type') || '';
    let responseData: any = null;

    if (contentType.includes('application/json')) {
      responseData = await wpResponse.json();
    } else {
      const rawText = await wpResponse.text();
      console.warn(`[Contact API] WordPress responded with non-JSON content: ${rawText.slice(0, 300)}`);
    }

    if (wpResponse.ok && responseData?.success) {
      console.log(
        `[Contact API] Successfully processed by WordPress SureForms Form ${TARGET_SUREFORMS_ID}. Entry ID: ${responseData?.entry_id || 'N/A'}`
      );
      return res.status(200).json({
        success: true,
        message:
          responseData.message ||
          'Thank you. Your inquiry has been submitted successfully. Our team will get back to you shortly.',
        entry_id: responseData?.entry_id,
        form_id: TARGET_SUREFORMS_ID,
      });
    }

    // Handle WordPress error responses
    const errorMsg =
      responseData?.message ||
      responseData?.error ||
      (wpResponse.status === 404
        ? 'The WordPress SureForms bridge endpoint was not found (404). Please ensure the TPPL SureForms Bridge plugin is active on https://thermogenprojects.com.'
        : `WordPress server returned status ${wpResponse.status}.`);

    console.error(`[Contact API] WordPress inquiry submission error [HTTP ${wpResponse.status}]:`, errorMsg);

    return res.status(wpResponse.status >= 400 && wpResponse.status < 500 ? 400 : 502).json({
      success: false,
      error:
        "We couldn't send your inquiry right now. Please try again or contact us directly at info@thermogenprojects.com.",
      details: errorMsg,
    });
  } catch (err: unknown) {
    const isAbort = err instanceof Error && err.name === 'AbortError';
    const errorDetails = isAbort
      ? 'Connection to WordPress timed out after 15 seconds.'
      : err instanceof Error
      ? err.message
      : 'Network error';

    console.error('[Contact API] Failed to reach WordPress bridge:', errorDetails);

    return res.status(503).json({
      success: false,
      error:
        "We couldn't send your inquiry right now. Please try again or contact us directly at info@thermogenprojects.com.",
      details: errorDetails,
    });
  }
});

// ========================================================================
// STATIC SERVING & VITE INTEGRATION
// ========================================================================

async function startServer() {
  // Mount static images directory
  const imagesDir = path.join(process.cwd(), 'Images');
  if (fs.existsSync(imagesDir)) {
    app.use('/Images', express.static(imagesDir));
    app.use('/thermogen-projects-website/Images', express.static(imagesDir));
  }

  const publicDir = path.join(process.cwd(), 'public');
  if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir));
    app.use('/thermogen-projects-website', express.static(publicDir));
  }

  if (process.env.NODE_ENV !== 'production') {
    // Redirect root to base path in dev mode if needed
    app.get('/', (_req, res, next) => {
      if (_req.headers.accept?.includes('text/html')) {
        return res.redirect('/thermogen-projects-website/');
      }
      next();
    });

    // Development mode: Vite middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Built assets
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.use('/thermogen-projects-website', express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Thermogen Server] Running at http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer().catch((err) => {
  console.error('[Thermogen Server] Failed to initialize server:', err);
  process.exit(1);
});
