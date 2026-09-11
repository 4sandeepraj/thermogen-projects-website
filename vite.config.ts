import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'serve-root-images',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const rawUrl = req.url || '';
            if (rawUrl.startsWith('/api/upload-photo') && req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => (body += chunk));
              req.on('end', () => {
                try {
                  const { filename, dataUrl } = JSON.parse(body);
                  if (filename && dataUrl) {
                    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
                    const buffer = Buffer.from(base64Data, 'base64');
                    const targetPath = path.join(__dirname, 'public', filename);
                    fs.writeFileSync(targetPath, buffer);
                    res.setHeader('Content-Type', 'application/json');
                    return res.end(JSON.stringify({ success: true, path: '/' + filename }));
                  }
                } catch {
                  // ignore
                }
                res.statusCode = 400;
                res.end('Failed');
              });
              return;
            }
            let decodedUrl = rawUrl;
            try {
              decodedUrl = decodeURIComponent(rawUrl).split('?')[0];
            } catch {
              decodedUrl = rawUrl.split('?')[0];
            }
            if (/\.(png|jpe?g|webp|svg|gif)$/i.test(decodedUrl)) {
              const filename = path.basename(decodedUrl);
              const possiblePaths = [
                path.join(__dirname, decodedUrl.replace(/^\//, '')),
                path.join(__dirname, 'Images', filename),
                path.join(__dirname, 'public', 'Images', filename),
                path.join(__dirname, 'public', filename),
                path.join(__dirname, filename),
                path.join(__dirname, 'src', 'assets', filename),
                path.join(__dirname, 'assets', filename),
              ];
              for (const filePath of possiblePaths) {
                if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                  const ext = path.extname(filePath).toLowerCase();
                  const contentType =
                    ext === '.png'
                      ? 'image/png'
                      : ext === '.svg'
                      ? 'image/svg+xml'
                      : ext === '.webp'
                      ? 'image/webp'
                      : 'image/jpeg';
                  res.setHeader('Content-Type', contentType);
                  res.setHeader('Cache-Control', 'public, max-age=3600');
                  return fs.createReadStream(filePath).pipe(res);
                }
              }
              // Also check directory listing case-insensitively
              const searchDirs = [
                path.join(__dirname, 'Images'),
                path.join(__dirname, 'public', 'Images'),
                path.join(__dirname, 'public'),
                __dirname,
                path.join(__dirname, 'src', 'assets'),
              ];
              for (const dir of searchDirs) {
                if (fs.existsSync(dir)) {
                  try {
                    const entries = fs.readdirSync(dir);
                    const match = entries.find(
                      (e) => e.toLowerCase() === filename.toLowerCase()
                    );
                    if (match) {
                      const fullMatchPath = path.join(dir, match);
                      if (fs.statSync(fullMatchPath).isFile()) {
                        const ext = path.extname(fullMatchPath).toLowerCase();
                        const contentType =
                          ext === '.png'
                            ? 'image/png'
                            : ext === '.svg'
                            ? 'image/svg+xml'
                            : ext === '.webp'
                            ? 'image/webp'
                            : 'image/jpeg';
                        res.setHeader('Content-Type', contentType);
                        res.setHeader('Cache-Control', 'public, max-age=3600');
                        return fs.createReadStream(fullMatchPath).pipe(res);
                      }
                    }
                  } catch {
                    // ignore
                  }
                }
              }
            }
            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
