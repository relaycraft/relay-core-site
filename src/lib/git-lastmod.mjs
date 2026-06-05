/**
 * Source-file → lastmod helpers shared between the sitemap generator
 * (`integrations/highlight-code.mjs`) and the docs layout
 * (`src/layouts/DocsLayout.astro`). Keep this module free of Astro-specific
 * imports so it can be used from either the integration (build hook) or
 * the layout (Astro frontmatter) without import-graph surprises.
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

// Map a built HTML path back to its source .astro under src/pages/.
// Inverse of the htmlFileToLoc logic in the integration. The
// `directory` build format is lossy for nested index.html, so we try
// the alongside path first (matches the dominant shape:
// `src/pages/docs/foo.astro` → `dist/docs/foo/index.html`) and fall
// back to the nested path (`src/pages/en/index.astro`).
export function htmlFileToSourcePath(filePath, distDir) {
  const rel = path.relative(distDir, filePath).replace(/\\/g, '/');
  if (rel === 'index.html') return 'src/pages/index.astro';
  if (rel.endsWith('/index.html')) {
    const dir = rel.slice(0, -'/index.html'.length);
    const alongside = `src/pages/${dir}.astro`;
    const nested = `src/pages/${dir}/index.astro`;
    if (fs.existsSync(alongside)) return alongside;
    return nested;
  }
  return `src/pages/${rel.replace(/\.html$/, '')}.astro`;
}

// Invert a URL pathname (the value Astro stores in `Astro.url.pathname`)
// to the matching source file. The build emits a `directory` URL like
// `/docs/foo/`, so the source is `src/pages/docs/foo.astro` (or
// `src/pages/en/docs/foo.astro` for the en locale).
export function urlPathToSourcePath(urlPath) {
  const stripped = urlPath.endsWith('/') ? urlPath.slice(0, -1) : urlPath;
  const alongside = `src/pages${stripped}.astro`;
  const nested = `src/pages${stripped}/index.astro`;
  if (fs.existsSync(alongside)) return alongside;
  return nested;
}

// Best-effort `git log -1 --format=%cI` on a source path. Returns the
// date portion (YYYY-MM-DD) or null if git/history is unavailable.
// Failure is silent: callers must accept that lastmod is optional.
export function lastmodFor(sourcePath) {
  try {
    const out = execSync(
      `git log -1 --format=%cI -- ${JSON.stringify(sourcePath)}`,
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    ).trim();
    return out ? out.slice(0, 10) : null;
  } catch {
    return null;
  }
}
