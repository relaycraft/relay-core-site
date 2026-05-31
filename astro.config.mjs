import { defineConfig } from 'astro/config';
import highlightCode from './integrations/highlight-code.mjs';

export default defineConfig({
  site: 'https://relay-core.dev',
  output: 'static',
  integrations: [highlightCode()],
  build: {
    format: 'directory'
  }
});
