# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (Next.js dev, http://localhost:3000)
- **Build:** `npm run build`
- **Start production:** `npm run start`
- **Tests:** `npm run test` (Jest + Testing Library)

## Architecture

This is a **Next.js 12** personal blog (xmatheus.dev) that renders Markdown posts as static pages. It uses **Preact** in production builds (aliased in next.config.js) and **styled-components** for styling.

### Content pipeline
- Blog posts are Markdown files in `src/posts/` with gray-matter frontmatter (title, author, summary, tags, createdAt with iso/formated fields).
- `src/services/api.ts` reads posts from the filesystem and sorts by date.
- `src/services/markdown.js` converts Markdown to HTML using remark (with GFM, footnotes, and Prism syntax highlighting).
- Post pages are statically generated via `src/pages/[slug].tsx` using `getStaticPaths`/`getStaticProps`.

### Styling and theming
- styled-components with a theme system (`src/styles/theme.ts`): dark (default) and white themes.
- Theme toggling via React Context (`src/context/theme.tsx`).
- Theme type declarations in `src/styles/styled.d.ts`.
- Global styles in `src/styles/global.ts`.
- Components follow the pattern: `index.tsx` (component) + `style.ts` (styled-components).

### Layout system
- `_app.tsx` wraps pages in `CustomThemeProvider` and `BurgerProvider` contexts.
- Pages can specify a layout via `(Page as PageWithMainLayoutType).Layout = LayoutComplete`.
- Default layout is `src/components/layouts/complete/`.

### Key conventions
- Imports use absolute paths from `src/` (configured via tsconfig `baseUrl: "."`).
- SVGs are imported as React components via `@svgr/webpack`.
- PWA support via `next-pwa` (disabled in development).
- Sitemap generated at build time via `scripts/generateSiteMapXML`.
- The blog content and UI strings are in Portuguese (pt-BR).
