import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseHTML } from 'linkedom';
import { createHighlighter } from 'shiki';
import { relayCoreDark, guessLang, langFromClass, normalizeCodeSource } from './shiki-theme.mjs';

const LANGS = [
  'bash',
  'shell',
  'javascript',
  'typescript',
  'tsx',
  'json',
  'python',
  'rust',
  'toml',
  'ini',
  'text',
];

function walkHtmlFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkHtmlFiles(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

/** Apply shiki to a single HTML string. Returns the modified string (or the
 *  original if nothing changed). Mutates nothing on disk. */
export function highlightHtml(highlighter, html) {
  const { document } = parseHTML(html);
  let changed = false;

  for (const pre of document.querySelectorAll('.docs-content pre')) {
    const code = pre.querySelector('code');
    if (!code) continue;
    if (code.classList.contains('shiki') || code.querySelector('.line')) continue;

    const source = normalizeCodeSource(code.textContent ?? '');
    if (!source.trim()) continue;

    let lang =
      langFromClass(code.getAttribute('class')) ??
      guessLang(source);
    if (!LANGS.includes(lang)) lang = 'text';

    let highlighted;
    try {
      highlighted = highlighter.codeToHtml(source, { lang, theme: 'relaycore-dark' });
    } catch {
      highlighted = highlighter.codeToHtml(source, { lang: 'text', theme: 'relaycore-dark' });
    }

    const { document: fragDoc } = parseHTML(highlighted);
    const shikiCode = fragDoc.querySelector('pre code');
    if (!shikiCode) continue;

    code.className = shikiCode.className;
    if (shikiCode.getAttribute('style')) {
      code.setAttribute('style', shikiCode.getAttribute('style'));
    } else {
      code.removeAttribute('style');
    }
    code.innerHTML = shikiCode.innerHTML;
    // shiki puts the 'shiki' class on the <pre>, not the <code>; the site CSS
    // targets `code.shiki`, so explicitly mark the <code> too. Without this,
    // every `.docs-content pre code.shiki { ... }` rule in code-highlight.css
    // misses and the block falls back to the unstyled `:not(.shiki)` path.
    code.classList.add('shiki');
    changed = true;
  }

  return changed ? document.toString() : html;
}

async function highlightFileOnDisk(highlighter, filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const out = highlightHtml(highlighter, html);
  if (out !== html) fs.writeFileSync(filePath, out);
}

export default function highlightCodeIntegration() {
  return {
    name: 'relaycore-highlight-code',
    hooks: {
      'astro:server:setup': async ({ server, logger }) => {
        // Dev preview only — production is handled by astro:build:done below.
        if (process.env.NODE_ENV === 'production') return;

        const highlighter = await createHighlighter({
          themes: [relayCoreDark],
          langs: LANGS,
        });

        // Expose the highlighter on the server so the Astro middleware
        // (src/middleware.ts) can call it per request without rebuilding.
        // Dev-only; build never touches this.
        server.middlewares.use((_req, _res, next) => {
          globalThis.__relaycoreShiki = highlighter;
          next();
        });
      },

      'astro:build:done': async ({ dir }) => {
        const distDir = fileURLToPath(dir);
        const highlighter = await createHighlighter({
          themes: [relayCoreDark],
          langs: LANGS,
        });

        const files = walkHtmlFiles(distDir);
        await Promise.all(files.map((f) => highlightFileOnDisk(highlighter, f)));
      },
    },
  };
}
