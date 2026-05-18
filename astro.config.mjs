import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://relay-core.dev',
  output: 'static',
  build: {
    format: 'directory'
  }
});
