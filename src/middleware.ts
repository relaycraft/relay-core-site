/** Dev-only middleware: applies shiki highlighting to HTML responses in `astro dev`.
 *  The integration (`integrations/highlight-code.mjs`) exposes the highlighter
 *  on `globalThis.__relaycoreShiki` during `astro:server:setup`. We import
 *  `highlightHtml` from the integration so build and dev share the exact same
 *  code path. In `astro build`, this middleware never runs (the integration
 *  handles the dist files in `astro:build:done` instead). */

import { highlightHtml } from '../integrations/highlight-code.mjs';
import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();
  const highlighter = globalThis.__relaycoreShiki;
  if (!highlighter) return response;

  const ct = response.headers.get('content-type') ?? '';
  if (!ct.includes('text/html')) return response;
  if (context.url.pathname.startsWith('/_astro/')) return response;

  const body = await response.text();
  const out = highlightHtml(highlighter, body);
  if (out === body) return response;

  return new Response(out, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
};
