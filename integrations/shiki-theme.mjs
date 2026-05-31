/** Custom dark theme aligned with relaycore.dev CSS variables */
export const relayCoreDark = {
  name: 'relaycore-dark',
  type: 'dark',
  colors: {
    'editor.background': '#0a0a0a',
    'editor.foreground': '#c8c8c8',
    'editorLineNumber.foreground': '#666666',
    'editor.selectionBackground': '#1a1a1a',
  },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#666666', fontStyle: 'italic' } },
    { scope: ['string', 'constant.other.symbol'], settings: { foreground: '#00ff41' } },
    { scope: ['constant.numeric', 'constant.language'], settings: { foreground: '#ff9500' } },
    { scope: ['keyword', 'storage.type', 'storage.modifier'], settings: { foreground: '#00d4ff' } },
    { scope: ['entity.name.function', 'support.function', 'meta.function-call'], settings: { foreground: '#e0e0e0' } },
    { scope: ['entity.name.tag', 'support.type.property-name', 'variable.other.property'], settings: { foreground: '#0099cc' } },
    { scope: ['variable', 'support.variable', 'entity.name.variable'], settings: { foreground: '#c8c8c8' } },
    { scope: ['punctuation', 'meta.brace'], settings: { foreground: '#808080' } },
    { scope: ['entity.name.type', 'support.type', 'support.class'], settings: { foreground: '#7dd3fc' } },
  ],
};

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
