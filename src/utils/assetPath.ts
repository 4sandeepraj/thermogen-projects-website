/**
 * Utility for resolving asset URLs across local development and GitHub Pages deployments.
 * Prepends the Vite base URL (e.g. '/thermogen-projects-website/' or '/') to asset paths,
 * ensuring assets resolve correctly regardless of subpath hosting.
 */

export function getAssetUrl(path: string | undefined | null): string {
  if (!path) return '';

  // Preserve external URLs and inline data/blob URIs
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Get configured Vite base URL (defaults to '/' or env fallback)
  const rawBase =
    (typeof import.meta !== 'undefined' &&
      import.meta.env &&
      import.meta.env.BASE_URL) ||
    '/';
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

  // Strip all leading slashes from the asset path
  const cleanPath = path.replace(/^\/+/, '');

  // If the path already begins with the base URL subpath, avoid duplicate prefixing
  const baseWithoutSlash = base.replace(/^\/+/, '').replace(/\/+$/, '');
  let resolved: string;
  if (baseWithoutSlash && cleanPath.startsWith(`${baseWithoutSlash}/`)) {
    resolved = `/${cleanPath}`;
  } else {
    resolved = `${base}${cleanPath}`;
  }

  // Safely percent-encode URL components while preserving URI separators
  return encodeURI(decodeURI(resolved));
}

/**
 * Returns an array of candidate URLs for an image asset, covering:
 * 1. Standard base-prefixed URL
 * 2. Fully encoded special characters (e.g. %26 for '&', %28 / %29 for parens)
 * 3. Direct filename lookup under root base
 */
export function getAssetCandidates(path: string | undefined | null): string[] {
  if (!path) return [];
  const primary = getAssetUrl(path);
  if (
    primary.startsWith('data:') ||
    primary.startsWith('http://') ||
    primary.startsWith('https://')
  ) {
    return [primary];
  }

  const candidates: string[] = [primary];

  // If filename has '&', try with '%26'
  if (primary.includes('&')) {
    const withAmpEncoded = primary.replace(/&/g, '%26');
    if (!candidates.includes(withAmpEncoded)) {
      candidates.push(withAmpEncoded);
    }
  }

  // If path is inside Images/, also try fallback to root-relative candidate
  const clean = path.replace(/^\/+/, '');
  if (clean.startsWith('Images/')) {
    const filenameOnly = clean.replace(/^Images\//, '');
    const altCandidate = getAssetUrl(filenameOnly);
    if (!candidates.includes(altCandidate)) {
      candidates.push(altCandidate);
    }
  } else {
    const imagesCandidate = getAssetUrl(`Images/${clean}`);
    if (!candidates.includes(imagesCandidate)) {
      candidates.push(imagesCandidate);
    }
  }

  return candidates;
}
