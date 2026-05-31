/** Dark theme for docs — Tokyo Night–inspired, cyan accent matches relaycore.dev */
export const relayCoreDark = {
  name: 'relaycore-dark',
  type: 'dark',
  colors: {
    'editor.background': '#0a0a0a',
    'editor.foreground': '#c8c8c8',
    'editorLineNumber.foreground': '#565f89',
    'editor.selectionBackground': '#1a2744',
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#565f89', fontStyle: 'italic' },
    },
    {
      scope: [
        'string',
        'string.quoted',
        'string.template',
        'constant.other.symbol',
        'constant.regexp',
      ],
      settings: { foreground: '#9ece6a' },
    },
    {
      scope: ['constant.numeric', 'constant.language.boolean', 'constant.language.null'],
      settings: { foreground: '#ff9e64' },
    },
    {
      scope: [
        'keyword',
        'storage.type',
        'storage.modifier',
        'keyword.control',
        'keyword.operator.new',
      ],
      settings: { foreground: '#00d4ff' },
    },
    {
      scope: ['keyword.operator', 'keyword.control.flow'],
      settings: { foreground: '#bb9af7' },
    },
    {
      scope: [
        'entity.name.function',
        'support.function',
        'meta.function-call',
        'variable.function',
      ],
      settings: { foreground: '#7aa2f7' },
    },
    {
      scope: [
        'variable.other.property',
        'support.variable.property',
        'variable.object.property',
        'meta.object-literal.key',
      ],
      settings: { foreground: '#73daca' },
    },
    {
      scope: ['entity.name.tag', 'support.type.property-name'],
      settings: { foreground: '#0099cc' },
    },
    {
      scope: ['variable', 'identifier', 'entity.name.variable'],
      settings: { foreground: '#c0caf5' },
    },
    {
      scope: ['entity.name.type', 'support.type', 'support.class'],
      settings: { foreground: '#2ac3de' },
    },
    {
      scope: ['punctuation', 'meta.brace', 'meta.delimiter'],
      settings: { foreground: '#6b7280' },
    },
    {
      scope: ['punctuation.definition.template-expression'],
      settings: { foreground: '#ff9e64' },
    },
  ],
};

/** Normalize broken Astro entity escapes before highlighting */
export function normalizeCodeSource(text) {
  return text
    .replace(/\$\{#36;\{/g, '${')
    .replace(/\$&#123;#36;&#123;/g, '${')
    .replace(/&#123;/g, '{')
    .replace(/&#125;/g, '}');
}

/** Guess language for plain <pre><code> blocks without a class */
export function guessLang(text) {
  const t = text.trim();
  if (!t) return 'text';
  if (t.startsWith('#!') || /^(\$|#|curl |npm |cargo |relay-core)/m.test(t)) return 'bash';
  if (/^def \w+\(/.test(t) || (t.includes('flow.request') && t.includes(':'))) return 'python';
  if (t.startsWith('[') && t.includes('dependencies]')) return 'ini';
  if (/^\{[\s\S]*\}$/.test(t) && t.includes('"')) {
    try {
      JSON.parse(t);
      return 'json';
    } catch {
      /* mixed JSON-ish docs */
    }
  }
  if (t.includes('globalThis.') || t.includes('=>') || t.includes('const ') || t.includes('import ')) {
    return 'javascript';
  }
  if (t.includes('pub fn ') || t.includes('#[cfg_attr')) return 'rust';
  if (t.includes('"permissions"') && t.includes('relay-core-tauri')) return 'json';
  return 'text';
}

export function langFromClass(className) {
  if (!className) return null;
  const m = className.match(/language-(\w+)/);
  return m ? m[1] : null;
}
