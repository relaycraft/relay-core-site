# RelayCore Site (relaycore.dev) — AI Agent Guide

This repo is the static site at <https://relaycore.dev>. It is **marketing + docs only**; the engine lives in `relaycraft/relay-core`.

## 1. Stack

- **Astro 4** static output (`output: 'static'`, `build.format: 'directory'`)
- Custom Shiki integration (`integrations/highlight-code.mjs`) — see §3
- `linkedom` for post-build HTML rewriting
- `@fontsource-variable/geist` (sans) + `0xProto` (mono)
- Deployed to **Cloudflare Pages** via `wrangler.jsonc` pointing at `dist/`

## 2. Layout & conventions

```
src/
  pages/
    index.astro          # zh home (default locale)
    404.astro
    docs/*.astro         # 22 zh doc pages
    en/
      index.astro        # en home (self-contained English mirror, not built from t.*)
      docs/*.astro       # 22 en doc pages (parallel to /docs/)
  layouts/
    BaseLayout.astro     # shared header/footer + global CSS variables
    DocsLayout.astro     # adds sidebar + the "Edit on GitHub" link
  components/            # 8 small Astro components
  i18n/
    translations.ts      # { en, zh } — UI strings only; page content is duplicated per locale
  styles/                # split by concern: fonts, typography, shared, home, code-highlight
  middleware.ts          # dev-only shiki pass (see §3)
public/
  og.svg                 # 1200x630 social card (SVG; some platforms strip it)
  _headers               # Cloudflare edge headers (security + cache)
  robots.txt
integrations/
  highlight-code.mjs     # the custom shiki integration
  shiki-theme.mjs        # custom `relaycore-dark` Shiki theme
```

### Locale convention

- URL prefix `/` → zh (default), `/en/` → en
- `getLocaleFromUrl(url)` in `src/i18n/translations.ts` derives locale from path
- The **zh home and zh docs** read UI strings from `translations.zh`
- The **en home and en docs** are self-contained English — they do **not** import the `translations` object. Keep them in sync by hand.
- `getAlternateUrl(url)` returns the matching URL in the other locale (used for `<link rel="alternate" hreflang>` and the language switcher)

### Hardcoded version in the hero

`src/pages/index.astro` and `src/pages/en/index.astro` both define a top-level `const CLI_VERSION = '0.7.4'` for the terminal mock. **Bump it on every release in lockstep with `relay-core`'s `Cargo.toml`.** The next maintainer needs to know this — do not let the constant drift.

## 3. The Shiki integration (read this before touching `integrations/highlight-code.mjs`)

We do **not** use Astro's built-in rehype-shiki. It runs at the Markdown→HTML boundary, which doesn't see the inline `<pre><code>` blocks our docs use.

Instead, this integration:

1. **Dev** (`astro dev`): registers a highlighter on `globalThis.__relaycoreShiki` during `astro:server:setup`, and `src/middleware.ts` post-processes every HTML response to swap `<pre><code>` in `.docs-content` for Shiki output.
2. **Build** (`astro build`): runs the same `highlightHtml()` in `astro:build:done` over every `dist/**/*.html`.
3. **Sitemap**: written to `dist/sitemap-index.xml` in the same `astro:build:done` hook (no lastmod yet — see §6).

### The `code.shiki` class bug (do not regress)

Shiki emits the `shiki` class on the **`<pre>`**, not the **`<code>`**. The site CSS targets `code.shiki` (see `src/styles/code-highlight.css`). The integration explicitly adds `code.classList.add('shiki')` after the swap (`integrations/highlight-code.mjs` ~line 73). **Without this, every `code.shiki` rule in `code-highlight.css` misses and blocks fall back to the unstyled `:not(.shiki)` path.** If you refactor this integration, preserve that one line and the comment explaining why.

## 4. Build & dev commands

```bash
npm run dev          # astro dev (uses middleware shiki pass)
npm run build        # git checkout HEAD -- astro.config.mjs && astro build
npm run preview      # astro preview
```

### The `git checkout HEAD -- astro.config.mjs` guard

The `build` script in `package.json` starts with `git checkout HEAD -- astro.config.mjs`. This is intentional — it discards any local dev tweaks to `astro.config.mjs` before a production build, so the dist is always reproducible from the committed config. **Do not remove it without a replacement** (e.g. env-driven config split).

## 5. Deploy

Cloudflare Pages, static assets only. `wrangler.jsonc` points at `./dist`. Edge security headers (nosniff, referrer, permissions, frame) and cache rules are in `public/_headers` — Cloudflare picks them up automatically. Astro's hashed `/_astro/*` is cached 1y immutable; fonts same; `og.svg` 1w.

## 6. Known gaps (intentionally left as a checklist)

- **No `lastmod` in sitemap** — would need a per-page `git log -1 --format=%cI` lookup keyed by source path; `astro:build:done` is the right place
- **OG image is SVG** — works on Twitter, fails on LinkedIn/Slack; add a 1200x630 PNG fallback and pick per `<meta>` in `SeoHead.astro`
- **No automated link checker** — even a single `npx linkinator dist/` step on CI would catch dead `/docs/*` references after a sidebar rename
- **No `lastmod` shown on doc pages** — visible in the existing `docs-meta` footer is the right place to add it
- **Hand-rolled i18n** — page content is duplicated in `src/pages/docs/` and `src/pages/en/docs/`. A move to Astro Content Collections with per-locale entries would halve maintenance for translators
- **Edit-on-GitHub link** lives in `DocsLayout.astro`; it points at `relaycraft/relay-core-site` (this repo), not the engine. Verify the org/repo name before renaming
