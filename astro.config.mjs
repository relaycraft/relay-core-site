import { defineConfig } from 'astro/config';
import highlightCode from './integrations/highlight-code.mjs';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://relay-core.dev',
  output: "hybrid",
  integrations: [highlightCode()],

  build: {
    format: 'directory'
  },

  adapter: cloudflare()
});