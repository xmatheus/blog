# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (Astro, http://localhost:4321)
- **Build:** `npm run build` (runs `astro check` then `astro build` → `dist/`)
- **Preview on the Cloudflare runtime:** `npm run preview` (`wrangler dev`, serves `dist/`)
- **Deploy:** automatic on push to `master` (Cloudflare Workers Builds runs `npm run build` + `npx wrangler deploy`). `npm run deploy` does the same manually.

## Architecture

Personal blog (xmatheus.dev) built with **Astro 7** as a fully static site, deployed to **Cloudflare Workers static assets** (`wrangler.jsonc`, no adapter/SSR). Styling is **Tailwind CSS v4** (via `@tailwindcss/vite`) plus a few hand-written CSS modules. Zero framework JS on the client — interactivity is small vanilla `<script>`s inside `.astro` components.

### Layout of `src/`
- `config/site.ts` — site metadata, author, skills, social and nav links (single source of truth).
- `data/projects.ts` — project cards shown on the home page (order is preserved).
- `content/posts/*.md` — blog posts; schema in `content.config.ts` (`tags` is a comma-separated string in frontmatter, transformed to an array; `createdAt`/`updatedAt` are `YYYY-MM-DD` strings). The post slug is the filename.
- `lib/` — `posts.ts` (sorting, URL, reading time), `date.ts` (pt-BR formatting), `theme.ts` (theme get/set), `markdown/` (rehype plugins).
- `layouts/BaseLayout.astro` — `<head>` (SEO, theme bootstrap script, fonts, GA), background, header, footer.
- `components/` — grouped by area: `layout/`, `home/`, `post/`, `ui/`, `seo/`. `ui/Icon.astro` inlines the Lucide icons used on the site.
- `pages/` — `index`, `blog/[slug]`, `404`, plus `feed.xml`, `sitemap.xml`, `robots.txt` endpoints.
- `styles/global.css` imports `tokens.css` (Tailwind `@theme` colors + Satoshi font), `base.css`, `background.css`, `theme.css`, `prism.css`, `prose.css`.

### Markdown pipeline
Uses the `unified` processor from `@astrojs/markdown-remark` (configured in `astro.config.mjs`) with smartypants off and built-in highlighting off. `rehype-prism.ts` highlights at build time with the same Prism grammars/markup the old client-side highlighter produced; `rehype-post-html.ts` adds lazy/`width=200` to images and wraps tables in `.table-wrapper`. After changing a markdown plugin, clear the content cache (`rm -rf node_modules/.astro`) or rendered posts will be stale.

### Theming
Dark (default) and light, driven by a `dark`/`light` class on `<html>`. An inline script in `BaseLayout` applies the saved theme (`localStorage.theme`) before paint; `components/layout/ThemeToggle.astro` toggles it. Theme-aware helpers (`text-*-color`, `bg-main`, `border-subtle`, `hover-bg`, …) live in `styles/theme.css`.

### Conventions
- Imports use the `@/` alias for `src/`.
- Static files (fonts, SEO icons, post media under `public/content/`) live in `public/`.
- Google Analytics is enabled only when `PUBLIC_GA_ID` is set at build time (committed in `.env.production`, so dev builds skip it).
- The blog content and UI strings are in Portuguese (pt-BR).
