# Blog Rewrite — Design Spec

## Overview

Rewrite xmatheus.dev from Next.js 12 (Pages Router, styled-components) to Next.js 16 (App Router, Tailwind CSS 4) as a professional portfolio/blog with perfect SEO.

**Reference:** brianlovin.com — dark mode elegante, navegação simples, conteúdo em foco.

---

## Stack

- Next.js 16 (App Router, Server Components, Turbopack)
- React 19, TypeScript 5
- Tailwind CSS 4
- Remark pipeline (remark-gfm, remark-footnotes, remark-html, remark-prism) + Dracula theme
- Satoshi font (self-hosted via `next/font/local`)
- `lucide-react` for icons (replaces `@svgr/webpack` custom SVGs)
- Google Analytics via `@next/third-parties`

---

## Project Structure

```
app/
  layout.tsx          # Root layout (metadata global, fonts, theme provider)
  globals.css         # Tailwind directives + @theme customization + Dracula CSS
  page.tsx            # Home — hero + posts recentes + projetos
  blog/
    [slug]/
      page.tsx        # Post individual (generateStaticParams + generateMetadata)
  projects/
    page.tsx          # Página de projetos (opcional)
  not-found.tsx       # 404
  error.tsx           # Runtime error boundary
  sitemap.ts          # Sitemap dinâmico
  robots.ts           # robots.txt dinâmico
  feed.xml/
    route.ts          # RSS feed
content/
  posts/              # Markdown files (migrados de src/posts/)
  projects.json       # Dados dos projetos
lib/
  posts.ts            # Leitura de posts (filesystem + gray-matter)
  markdown.ts         # Pipeline remark → HTML
components/
  PostCard.tsx
  ProjectCard.tsx
  ThemeToggle.tsx      # Client component ("use client")
  Header.tsx
  Footer.tsx
public/
  fonts/              # Satoshi font files
  seo/                # Favicon, OG image, etc.
```

**Route constraints:** Post slugs live under `/blog/[slug]` to avoid collision with static routes (`/projects`, `/feed.xml`, etc.). URLs become `xmatheus.dev/blog/post-name`.

---

## Design Visual

### Paleta de cores

**Dark (padrão):**
- Background: `#111111`
- Surface/cards: `#1a1a1a`
- Texto: `#e5e5e5`
- Texto secundário: `#888888`
- Accent: `#3b82f6`
- Accent hover: `#60a5fa`

**Light:**
- Background: `#fafafa`
- Surface/cards: `#ffffff`
- Texto: `#171717`
- Texto secundário: `#6b7280`
- Mesmos accents

### Typography

- Font: Satoshi (self-hosted, `next/font/local`, font-display: swap)
- Headings: Satoshi Bold
- Body: Satoshi Regular, 16px base

### Layout

- Max-width `680px` centrado
- Sem sidebar
- Header: nome + navegação inline (Blog, Projetos, GitHub) + theme toggle
- Footer: links sociais minimalista

### Home page — 3 seções

1. **Hero** — nome, título (Full Stack Developer), bio curta, skills (JavaScript, React, Node.js, Python, C), links sociais (GitHub, Instagram, Email, Dribbble)
2. **Projetos em destaque** — cards com título, descrição, tags, link (filtrados por `featured: true`)
3. **Posts recentes** — lista com data, título, resumo, tags, tempo de leitura

### Post page

- Título grande, data, tempo de leitura
- Conteúdo Markdown com syntax highlighting (Dracula theme)
- Sem sidebar, sem distrações

### Responsivo

- Mobile: header com hamburger menu, seções empilham
- Layout coluna única escala naturalmente

---

## Content Pipeline

### Posts (Markdown)

Frontmatter simplificado:

```yaml
---
title: 'O começo do blog'
author: 'Matheus Felipe'
summary: 'Descrição do post'
tags: 'JavaScript, Next.js'
createdAt: '2021-07-31'
updatedAt: '2021-08-01'
---
```

- **Migration:** existing posts use nested `createdAt: {iso, formated}` — migrate to flat `createdAt: 'YYYY-MM-DD'` string. Only 2 posts, manual edit.
- `updatedAt` optional — when absent, `dateModified` in schema.org falls back to `createdAt`
- Remark pipeline: remark → remark-gfm → remark-footnotes → remark-html → remark-prism
- Dracula CSS theme imported in `app/globals.css`
- Lazy loading automático em imagens
- `generateStaticParams()` in `app/blog/[slug]/page.tsx` to statically generate all posts at build time

### Projects (`content/projects.json`)

```json
[
  {
    "title": "Nome do Projeto",
    "description": "Descrição curta",
    "tags": ["React", "Node.js"],
    "link": "https://github.com/xmatheus/...",
    "featured": true
  }
]
```

- `featured: true` aparece na home
- Placeholder com inicial (sem imagens por enquanto)

### Theme (dark/light)

- Persistido via `localStorage` + cookie (SSR sem flash)
- Tailwind `dark:` classes + provider client-side mínimo

---

## SEO — Cobertura Completa

### Metadata API

- `metadata` export em `layout.tsx`/`page.tsx`
- `generateMetadata()` dinâmico nos posts
- Template: `%s · Matheus Felipe` (home: `Matheus Felipe · Full Stack Developer`)

### Arquivos dinâmicos

- `app/sitemap.ts` — sitemap XML gerado dos posts
- `app/robots.ts` — permite indexação, aponta para sitemap
- `app/feed.xml/route.ts` — RSS feed

### Structured Data (JSON-LD)

- Home: `Person` + `WebSite`
- Posts: `Article` com `author`, `datePublished`, `dateModified`, `headline`
- Breadcrumbs em todas as páginas

### Open Graph e Twitter

- OG image estática padrão
- `og:title`, `og:description`, `og:url`, `og:type` em todas as páginas
- Twitter card `summary_large_image`

### Performance/técnico

- `next/font/local` com Satoshi (font-display: swap, sem CLS)
- `next/image` para imagens (lazy loading, formatos modernos)
- Canonical URLs em todas as páginas
- `lang="pt-BR"` no HTML

### Analytics

- Google Analytics via `@next/third-parties`

---

## Removido

- styled-components
- Preact alias
- `next-pwa`
- AdSense
- `_document.tsx`, `_app.tsx`
- Burger menu / sidebar (layout simplificado)
- `nextjs-progressbar`
- Componente `RightTools`
- `@svgr/webpack` (replaced by `lucide-react`)
- Skills section as standalone grid (moved into hero as inline tags)
- `NewsArticle` schema (replaced by `Article` — blog posts are not news)

## Mantido/Adaptado

- Pipeline remark (Markdown → HTML)
- Posts em Markdown com frontmatter
- Google Analytics
- Dracula theme (syntax highlighting)
- Dark/light mode (reimplementado com Tailwind)
- Links sociais (GitHub, Instagram, Email, Dribbble)

## Novo

- Tailwind CSS 4 (theme via `@theme` directives in `app/globals.css`)
- Satoshi font (self-hosted)
- `lucide-react` for icons
- `content/projects.json`
- Sitemap, robots.txt, RSS feed dinâmicos
- Metadata API nativa
- JSON-LD correto (Article, Person, WebSite, Breadcrumbs)
- Canonical URLs
- `error.tsx` runtime error boundary
- Post routes under `/blog/[slug]` with `generateStaticParams()`

## Deployment

- Vercel (current: blog-xmatheus.vercel.app / xmatheus.dev)
- Environment variable: `NEXT_PUBLIC_GA_ID` for Google Analytics
