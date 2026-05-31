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

async function highlightFile(highlighter, filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
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
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, document.toString());
  }
}

export default function highlightCodeIntegration() {
  return {
    name: 'relaycore-highlight-code',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const distDir = fileURLToPath(dir);
        const highlighter = await createHighlighter({
          themes: [relayCoreDark],
          langs: LANGS,
        });

        const files = walkHtmlFiles(distDir);
        await Promise.all(files.map((f) => highlightFile(highlighter, f)));
      },
    },
  };
}
