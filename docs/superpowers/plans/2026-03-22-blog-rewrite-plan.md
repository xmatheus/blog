# Blog Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite xmatheus.dev from Next.js 12 to Next.js 16 with App Router, Tailwind CSS 4, and perfect SEO.

**Architecture:** Fresh Next.js 16 project with App Router. Server Components by default, client components only for interactivity (theme toggle). Content pipeline reads Markdown files from `content/posts/` and project data from `content/projects.json`. Remark converts Markdown to HTML at build time.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, gray-matter, remark, lucide-react, Satoshi font, @next/third-parties (GA)

**Spec:** `docs/superpowers/specs/2026-03-22-blog-rewrite-design.md`

**Security note:** This project uses `dangerouslySetInnerHTML` in two controlled contexts: (1) JSON-LD structured data generated from our own constants — no user input involved. (2) Markdown-to-HTML conversion processed at build time from trusted local `.md` files, not user-submitted content. Both are standard Next.js patterns for blogs.

---

## File Structure

```
app/
  layout.tsx              # Root layout — fonts, metadata, theme, GA
  globals.css             # Tailwind @import, @theme, Dracula CSS, global styles
  page.tsx                # Home — hero, featured projects, recent posts
  blog/
    [slug]/
      page.tsx            # Post page — generateStaticParams + generateMetadata
  not-found.tsx           # 404 page
  error.tsx               # Runtime error boundary
  sitemap.ts              # Dynamic sitemap
  robots.ts               # Dynamic robots.txt
  feed.xml/
    route.ts              # RSS feed route handler
components/
  Header.tsx              # Server component — nav + ThemeToggle
  Footer.tsx              # Server component — social links
  ThemeToggle.tsx          # Client component — dark/light switch
  ThemeProvider.tsx        # Client component — theme context + cookie/localStorage
  PostCard.tsx             # Server component — post list item
  ProjectCard.tsx          # Server component — project card
content/
  posts/                  # Markdown files (migrated frontmatter)
  projects.json           # Project data
lib/
  posts.ts                # Read/parse/sort posts from filesystem
  markdown.ts             # Remark pipeline — HTML
  constants.ts            # SITE_URL, SITE_NAME, AUTHOR constants
postcss.config.mjs        # PostCSS config for Tailwind
next.config.ts            # Next.js 16 config (minimal)
public/
  fonts/                  # Satoshi woff2 files
  seo/                    # Favicon, OG image (kept from current)
```

---

### Task 1: Scaffold Next.js 16 project

**Files:**
- Create: `package.json` (overwrite)
- Create: `tsconfig.json` (overwrite)
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `app/page.tsx`

- [ ] **Step 1: Initialize new package.json with Next.js 16 dependencies**

```bash
rm -rf node_modules package-lock.json
```

Overwrite `package.json`:

```json
{
  "name": "xmatheus-dev",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^16",
    "react": "^19",
    "react-dom": "^19",
    "gray-matter": "^4.0.3",
    "remark": "^15",
    "remark-gfm": "^4",
    "remark-html": "^16",
    "remark-prism": "^1.3.6",
    "lucide-react": "^0.468",
    "@next/third-parties": "^16"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "typescript": "^5",
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19"
  }
}
```

Note: `remark-footnotes` was merged into remark-gfm in v4 — no longer needed as separate dep.

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create next.config.ts**

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {}

export default nextConfig
```

- [ ] **Step 4: Create postcss.config.mjs**

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

- [ ] **Step 5: Download Satoshi font files**

```bash
mkdir -p public/fonts
curl -L "https://api.fontshare.com/v2/css?f[]=satoshi@400&display=swap" -o /dev/null  # Verify font exists
```

**Manual step:** Go to https://www.fontshare.com/fonts/satoshi, click "Download", extract the zip, and copy:
- `Satoshi-Regular.woff2` → `public/fonts/Satoshi-Regular.woff2`
- `Satoshi-Bold.woff2` → `public/fonts/Satoshi-Bold.woff2`

If woff2 files are not in the download, use the `.otf` or `.ttf` files and update the `localFont` src paths accordingly.

- [ ] **Step 6: Create app/globals.css**

```css
@import "tailwindcss";

@theme {
  --color-background: #111111;
  --color-surface: #1a1a1a;
  --color-text: #e5e5e5;
  --color-text-secondary: #888888;
  --color-accent: #3b82f6;
  --color-accent-hover: #60a5fa;
  --color-divider: rgba(255, 255, 255, 0.08);

  --color-background-light: #fafafa;
  --color-surface-light: #ffffff;
  --color-text-light: #171717;
  --color-text-secondary-light: #6b7280;
  --color-divider-light: rgba(0, 0, 0, 0.08);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-size: 16px;
  line-height: 1.6;
}

:root.dark body {
  background-color: var(--color-background);
  color: var(--color-text);
}

:root.light body {
  background-color: var(--color-background-light);
  color: var(--color-text-light);
}

:root.dark {
  color-scheme: dark;
}

:root.light {
  color-scheme: light;
}

/* Dracula Prism theme — appended below via: cat src/styles/dracula-prism.css >> app/globals.css */
```

Append the Dracula Prism CSS:

```bash
echo "" >> app/globals.css
cat src/styles/dracula-prism.css >> app/globals.css
```

- [ ] **Step 7: Create minimal app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

const satoshi = localFont({
  src: [
    { path: '../public/fonts/Satoshi-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/Satoshi-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Matheus Felipe · Full Stack Developer',
    template: '%s · Matheus Felipe',
  },
  description: 'Site pessoal e blog de Matheus Felipe, desenvolvedor Full Stack especializado em JavaScript, React e Node.js',
  metadataBase: new URL('https://xmatheus.dev'),
}

// Blocking script to prevent theme flash — reads localStorage before paint
const themeScript = `
  (function() {
    try {
      var t = localStorage.getItem('theme');
      if (t === 'light' || t === 'dark') {
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(t);
      }
    } catch(e) {}
  })();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`dark ${satoshi.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-[family-name:var(--font-satoshi)] antialiased">
        {children}
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  )
}
```

- [ ] **Step 8: Create placeholder app/page.tsx**

```tsx
export default function Home() {
  return (
    <main className="mx-auto max-w-[680px] px-4 py-16">
      <h1 className="text-3xl font-bold">Matheus Felipe</h1>
      <p className="mt-2 text-[var(--color-text-secondary)]">Full Stack Developer</p>
    </main>
  )
}
```

- [ ] **Step 9: Install dependencies and verify dev server starts**

```bash
npm install
npm run dev
```

Expected: Dev server starts on http://localhost:3000, shows the placeholder page with Satoshi font.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 16 project with Tailwind CSS 4 and Satoshi font"
```

---

### Task 2: Content pipeline — lib/posts.ts and lib/markdown.ts

**Files:**
- Create: `lib/constants.ts`
- Create: `lib/posts.ts`
- Create: `lib/markdown.ts`
- Migrate: `src/posts/*.md` to `content/posts/*.md` (update frontmatter)
- Create: `content/projects.json`

- [ ] **Step 1: Create lib/constants.ts**

```typescript
export const SITE_URL = 'https://xmatheus.dev'
export const SITE_NAME = 'Matheus Felipe'
export const SITE_DESCRIPTION = 'Site pessoal e blog de Matheus Felipe, desenvolvedor Full Stack especializado em JavaScript, React e Node.js'
export const AUTHOR = {
  name: 'Matheus Felipe',
  fullName: 'Matheus Felipe Teodoro Correia',
  role: 'Full Stack Developer',
  bio: 'Trabalho como Full Stack e sou formado em Ciência da Computação pela UFMT. Gosto de mexer com JS, Python e de vez em quando me aventuro em C e programação dinâmica.',
  github: 'https://github.com/xmatheus',
  instagram: 'https://www.instagram.com/matheus.ftc/',
  email: 'matheuscorreia559@gmail.com',
  dribbble: 'https://dribbble.com/xmatheus',
}
```

- [ ] **Step 2: Create lib/posts.ts**

```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  author: string
  summary: string
  tags: string[]
  createdAt: string
  updatedAt?: string
  content: string
  timeToRead: string
}

function calculateTimeToRead(content: string): string {
  const wpm = 225
  const words = content.trim().split(/\s+/).length
  const time = Math.ceil(words / wpm)
  return `${time} min`
}

export function getPost(slug: string): Post {
  const filePath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title,
    author: data.author,
    summary: data.summary,
    tags: data.tags.split(',').map((t: string) => t.trim()),
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    content,
    timeToRead: calculateTimeToRead(content),
  }
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'))
  return files
    .map(file => getPost(file.replace(/\.md$/, '')))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getAllSlugs(): string[] {
  return fs.readdirSync(postsDirectory)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''))
}
```

- [ ] **Step 3: Create lib/markdown.ts**

```typescript
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import prism from 'remark-prism'

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(prism)
    .use(html, { sanitize: false })
    .process(markdown)

  return result
    .toString()
    .replace(
      /<img (?<attributes>.*)">{1}/gm,
      '<img $1" loading="lazy" width="200" height="auto">'
    )
}
```

- [ ] **Step 4: Migrate and update post frontmatter**

Copy `src/posts/*.md` to `content/posts/` and update frontmatter format.

`content/posts/primeira-postagem-do-blog.md` — change frontmatter to:
```yaml
---
title: 'O começo do blog'
author: 'Matheus Felipe'
summary: 'O motivo da criação do blog e alguns detalhes sobre a construção dele'
tags: 'Hello world, Javascript, Nextjs'
createdAt: '2021-07-31'
---
```

`content/posts/melhorando-interfaces-com-alguns-passos.md` — change frontmatter to:
```yaml
---
title: 'Como melhorar interfaces com alguns passos simples'
author: 'Matheus Felipe'
summary: 'Em UI existe alguns conceitos que podem facilmente serem aplicados em diversas interfaces, nesse post eu lhe ensino um pouco sobre eles.'
tags: 'UI/UX, web-dev'
createdAt: '2022-03-03'
---
```

- [ ] **Step 5: Create content/projects.json**

```json
[
  {
    "title": "Blog Pessoal",
    "description": "Site pessoal e blog construído com Next.js, Tailwind CSS e Markdown",
    "tags": ["Next.js", "Tailwind CSS", "TypeScript"],
    "link": "https://github.com/xmatheus/blog",
    "featured": true
  }
]
```

(User will add real projects later — this is a placeholder with one real entry.)

- [ ] **Step 6: Verify posts load correctly**

Update `app/page.tsx` temporarily:

```tsx
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts()
  return (
    <main className="mx-auto max-w-[680px] px-4 py-16">
      <h1 className="text-3xl font-bold">Matheus Felipe</h1>
      <p className="mt-2">{posts.length} posts found</p>
      {posts.map(post => (
        <p key={post.slug}>{post.title} — {post.createdAt}</p>
      ))}
    </main>
  )
}
```

```bash
npm run dev
```

Expected: Page shows "2 posts found" with titles and dates.

- [ ] **Step 7: Commit**

```bash
git add lib/ content/ app/page.tsx
git commit -m "feat: add content pipeline — posts, markdown, projects data"
```

---

### Task 3: Theme system (dark/light mode)

**Files:**
- Create: `components/ThemeProvider.tsx`
- Create: `components/ThemeToggle.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Create components/ThemeProvider.tsx**

```tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

const ThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
}>({ theme: 'dark', toggleTheme: () => {} })

export const useTheme = () => useContext(ThemeContext)

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved) {
      setTheme(saved)
      document.documentElement.classList.remove('dark', 'light')
      document.documentElement.classList.add(saved)
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(next)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

- [ ] **Step 2: Create components/ThemeToggle.tsx**

```tsx
'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Trocar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
      title={`Tema atual: ${theme}`}
      className="p-2 rounded-md transition-colors hover:bg-[var(--color-surface)]"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
```

- [ ] **Step 3: Wrap layout with ThemeProvider**

Update `app/layout.tsx` — add `import ThemeProvider from '@/components/ThemeProvider'` and wrap the body contents:

```tsx
<body className="font-[family-name:var(--font-satoshi)] antialiased">
  <ThemeProvider>
    {children}
  </ThemeProvider>
</body>
```

The `<html>` already has `className="dark"` as default (set in Task 1). ThemeProvider overrides this on mount if the user has a saved preference.

- [ ] **Step 4: Verify theme toggle works**

Temporarily add `import ThemeToggle from '@/components/ThemeToggle'` and `<ThemeToggle />` to `app/page.tsx`. Run dev server, click the toggle, verify background and text colors switch. Reload the page — saved preference should persist.

- [ ] **Step 5: Commit**

```bash
git add components/ThemeProvider.tsx components/ThemeToggle.tsx app/
git commit -m "feat: add dark/light theme system with persistence"
```

---

### Task 4: Header and Footer components

**Files:**
- Create: `components/Header.tsx`
- Create: `components/Footer.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create components/Header.tsx**

```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { href: '/', label: 'Blog' },
  { href: 'https://github.com/xmatheus', label: 'GitHub', external: true },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="mx-auto max-w-[680px] px-4 py-6">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold transition-colors hover:text-[var(--color-accent)]"
        >
          Matheus Felipe
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 sm:flex">
          {navLinks.map(link =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              >
                {link.label}
              </Link>
            )
          )}
          <ThemeToggle />
        </nav>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="p-2"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="mt-4 flex flex-col gap-3 border-t border-[var(--color-divider)] pt-4 sm:hidden">
          {navLinks.map(link =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Create components/Footer.tsx**

```tsx
import { Github, Instagram, Mail, Dribbble } from 'lucide-react'
import { AUTHOR } from '@/lib/constants'

const links = [
  { href: AUTHOR.github, icon: Github, label: 'GitHub' },
  { href: AUTHOR.instagram, icon: Instagram, label: 'Instagram' },
  { href: `mailto:${AUTHOR.email}`, icon: Mail, label: 'Email' },
  { href: AUTHOR.dribbble, icon: Dribbble, label: 'Dribbble' },
]

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[680px] px-4 py-12">
      <div className="flex items-center justify-between border-t border-[var(--color-divider)] pt-8">
        <p className="text-sm text-[var(--color-text-secondary)]">
          &copy; {new Date().getFullYear()} Matheus Felipe
        </p>
        <div className="flex items-center gap-4">
          {links.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Add Header and Footer to app/layout.tsx**

Add imports for `Header` and `Footer`. Inside `<ThemeProvider>`, structure as:

```tsx
<ThemeProvider>
  <Header />
  <main className="mx-auto max-w-[680px] px-4 py-8">
    {children}
  </main>
  <Footer />
</ThemeProvider>
```

Remove the `<main>` wrapper and temporary ThemeToggle from `app/page.tsx` (layout now handles both).

- [ ] **Step 4: Verify layout renders correctly**

```bash
npm run dev
```

Expected: Header with name, nav links, and theme toggle at top. Footer with copyright and social icons at bottom. Content centered at 680px.

- [ ] **Step 5: Commit**

```bash
git add components/Header.tsx components/Footer.tsx app/layout.tsx app/page.tsx
git commit -m "feat: add Header and Footer with navigation and social links"
```

---

### Task 5: Home page — hero, projects, posts

**Files:**
- Create: `components/PostCard.tsx`
- Create: `components/ProjectCard.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create components/PostCard.tsx**

```tsx
import Link from 'next/link'
import type { Post } from '@/lib/posts'

function formatDate(dateStr: string): string {
  // Append T00:00:00 to avoid timezone shift with date-only strings
  const date = new Date(`${dateStr}T00:00:00`)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-lg border border-transparent p-4 -mx-4 transition-colors hover:border-[var(--color-divider)] hover:bg-[var(--color-surface)]"
    >
      <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
        <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
        <span>·</span>
        <span>{post.timeToRead}</span>
      </div>

      <h3 className="mt-1 text-lg font-bold group-hover:text-[var(--color-accent)]">
        {post.title}
      </h3>

      <p className="mt-1 text-sm text-[var(--color-text-secondary)] line-clamp-2">
        {post.summary}
      </p>

      <div className="mt-2 flex flex-wrap gap-2">
        {post.tags.map(tag => (
          <span
            key={tag}
            className="text-xs text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: Create components/ProjectCard.tsx**

```tsx
import { ExternalLink } from 'lucide-react'

interface Project {
  title: string
  description: string
  tags: string[]
  link: string
  featured?: boolean
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-lg border border-[var(--color-divider)] p-4 transition-colors hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-surface)]"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold">
          {project.title.charAt(0)}
        </div>
        <ExternalLink size={14} className="text-[var(--color-text-secondary)] opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <h3 className="mt-3 font-bold group-hover:text-[var(--color-accent)]">
        {project.title}
      </h3>

      <p className="mt-1 text-sm text-[var(--color-text-secondary)] line-clamp-2">
        {project.description}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span
            key={tag}
            className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-divider)] px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  )
}
```

- [ ] **Step 3: Build the full home page (app/page.tsx)**

```tsx
import { Github, Instagram, Mail, Dribbble } from 'lucide-react'
import { getAllPosts } from '@/lib/posts'
import { AUTHOR } from '@/lib/constants'
import PostCard from '@/components/PostCard'
import ProjectCard from '@/components/ProjectCard'
import projects from '@/content/projects.json'

const socialLinks = [
  { href: AUTHOR.github, icon: Github, label: 'GitHub' },
  { href: AUTHOR.instagram, icon: Instagram, label: 'Instagram' },
  { href: `mailto:${AUTHOR.email}`, icon: Mail, label: 'Email' },
  { href: AUTHOR.dribbble, icon: Dribbble, label: 'Dribbble' },
]

const skills = ['JavaScript', 'React', 'Node.js', 'Python', 'C']

export default function Home() {
  const posts = getAllPosts()
  const featuredProjects = projects.filter((p: { featured?: boolean }) => p.featured)

  return (
    <>
      {/* Hero */}
      <section className="py-8">
        <h1 className="text-3xl font-bold">{AUTHOR.name}</h1>
        <p className="mt-1 text-[var(--color-accent)]">{AUTHOR.role}</p>
        <p className="mt-3 text-[var(--color-text-secondary)] leading-relaxed">
          {AUTHOR.bio}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map(skill => (
            <span
              key={skill}
              className="text-xs border border-[var(--color-divider)] px-2.5 py-1 rounded-full text-[var(--color-text-secondary)]"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-8 border-t border-[var(--color-divider)]">
          <h2 className="text-xl font-bold">Projetos</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {featuredProjects.map((project: { title: string; description: string; tags: string[]; link: string; featured?: boolean }) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-8 border-t border-[var(--color-divider)]">
        <h2 className="text-xl font-bold">Posts</h2>
        <div className="mt-4 space-y-1">
          {posts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 4: Verify home page renders all sections**

```bash
npm run dev
```

Expected: Hero with name, role, bio, skill tags, social links. Projects section with cards. Posts section with 2 post cards showing dates, titles, summaries, tags, reading time.

- [ ] **Step 5: Commit**

```bash
git add components/PostCard.tsx components/ProjectCard.tsx app/page.tsx
git commit -m "feat: build home page with hero, projects, and posts sections"
```

---

### Task 6: Blog post page

**Files:**
- Create: `app/blog/[slug]/page.tsx`
- Modify: `app/globals.css` (add prose-custom styles)

- [ ] **Step 1: Create app/blog/[slug]/page.tsx**

```tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllSlugs, getPost } from '@/lib/posts'
import { markdownToHtml } from '@/lib/markdown'
import { SITE_URL, AUTHOR } from '@/lib/constants'

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params

  try {
    const post = getPost(slug)
    return {
      title: post.title,
      description: post.summary,
      openGraph: {
        title: post.title,
        description: post.summary,
        url: `${SITE_URL}/blog/${slug}`,
        type: 'article',
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt || post.createdAt,
        authors: [AUTHOR.name],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.summary,
      },
      alternates: {
        canonical: `${SITE_URL}/blog/${slug}`,
      },
    }
  } catch {
    return {}
  }
}

function formatDate(dateStr: string): string {
  // Append T00:00:00 to avoid timezone shift with date-only strings
  const date = new Date(`${dateStr}T00:00:00`)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogPost(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params

  let post
  try {
    post = getPost(slug)
  } catch {
    notFound()
  }

  const htmlContent = await markdownToHtml(post.content)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      datePublished: post.createdAt,
      dateModified: post.updatedAt || post.createdAt,
      author: { '@type': 'Person', name: AUTHOR.fullName },
      publisher: { '@type': 'Organization', name: 'xmatheus.dev' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${slug}` },
      ],
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold leading-tight">{post.title}</h1>
          <p className="mt-2 text-[var(--color-text-secondary)]">{post.summary}</p>
          <div className="mt-3 flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
            <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
            <span>·</span>
            <span>{post.timeToRead}</span>
          </div>
        </header>

        <div
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </>
  )
}
```

Note on `dangerouslySetInnerHTML`: JSON-LD is generated from our own constants (no user input). Markdown HTML is processed at build time from local `.md` files (trusted content, not user-submitted).

- [ ] **Step 2: Add prose-custom styles to app/globals.css**

Append to `globals.css`:

```css
/* Post content styles */
.prose-custom {
  line-height: 1.8;
}

.prose-custom h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
}

.prose-custom h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}

.prose-custom p {
  margin-bottom: 1.25rem;
}

.prose-custom a {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.prose-custom a:hover {
  color: var(--color-accent-hover);
}

.prose-custom code {
  font-family: 'Fira Code', Consolas, Monaco, monospace;
  font-size: 0.9em;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
}

:root.dark .prose-custom code {
  background-color: var(--color-surface);
}

:root.light .prose-custom code {
  background-color: #f1f5f9;
}

.prose-custom pre code {
  background: none;
  padding: 0;
}

.prose-custom pre {
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1.25rem;
}

.prose-custom blockquote {
  border-left: 2px solid var(--color-accent);
  padding-left: 1rem;
  font-style: italic;
}

:root.dark .prose-custom blockquote {
  color: var(--color-text-secondary);
}

:root.light .prose-custom blockquote {
  color: var(--color-text-secondary-light);
}

.prose-custom ul,
.prose-custom ol {
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
}

.prose-custom img {
  max-width: 100%;
  border-radius: 0.5rem;
}

.prose-custom hr {
  border: 0;
  height: 1px;
  margin: 2rem 0;
}

:root.dark .prose-custom hr {
  background-color: var(--color-divider);
}

:root.light .prose-custom hr {
  background-color: var(--color-divider-light);
}
```

- [ ] **Step 3: Verify blog post page**

```bash
npm run dev
```

Navigate to http://localhost:3000/blog/primeira-postagem-do-blog

Expected: Post renders with title, summary, date, reading time, and full Markdown content with syntax highlighting (Dracula theme).

- [ ] **Step 4: Commit**

```bash
git add app/blog/ app/globals.css
git commit -m "feat: add blog post page with generateStaticParams and metadata"
```

---

### Task 7: SEO files — sitemap, robots, RSS, JSON-LD, error/404 pages

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `app/feed.xml/route.ts`
- Create: `app/not-found.tsx`
- Create: `app/error.tsx`
- Modify: `app/layout.tsx` (add JSON-LD for Person + WebSite, expand metadata)

- [ ] **Step 1: Create app/sitemap.ts**

```typescript
import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { SITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const postEntries = posts.map(post => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...postEntries,
  ]
}
```

- [ ] **Step 2: Create app/robots.ts**

```typescript
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
```

- [ ] **Step 3: Create app/feed.xml/route.ts**

```typescript
import { getAllPosts } from '@/lib/posts'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'

export async function GET() {
  const posts = getAllPosts()

  const items = posts
    .map(
      post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.summary}]]></description>
    </item>`
    )
    .join('')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>pt-BR</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new Response(feed, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
```

- [ ] **Step 4: Create app/not-found.tsx**

```tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-[var(--color-text-secondary)]">Página não encontrada</p>
      <Link
        href="/"
        className="mt-6 inline-block text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
      >
        Voltar para o início
      </Link>
    </div>
  )
}
```

- [ ] **Step 5: Create app/error.tsx**

```tsx
'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="py-24 text-center">
      <h1 className="text-4xl font-bold">Algo deu errado</h1>
      <p className="mt-4 text-[var(--color-text-secondary)]">
        Ocorreu um erro inesperado.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-md bg-[var(--color-accent)] px-4 py-2 text-white transition-colors hover:bg-[var(--color-accent-hover)]"
      >
        Tentar novamente
      </button>
    </div>
  )
}
```

- [ ] **Step 6: Add JSON-LD for Person + WebSite to app/layout.tsx**

Add before `<ThemeProvider>` inside the `<body>`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Matheus Felipe',
        url: 'https://xmatheus.dev',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Matheus Felipe Teodoro Correia',
        url: 'https://xmatheus.dev',
        jobTitle: 'Full Stack Developer',
        sameAs: [
          'https://github.com/xmatheus',
          'https://www.instagram.com/matheus.ftc/',
          'https://dribbble.com/xmatheus',
        ],
      },
    ]),
  }}
/>
```

Also add a breadcrumb for the home page:

```tsx
{
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://xmatheus.dev' },
  ],
},
```

Note: JSON-LD uses only hardcoded constants — no user input.

- [ ] **Step 7: Expand root metadata in layout.tsx**

Update the `metadata` export to include OG and Twitter defaults:

```typescript
export const metadata: Metadata = {
  title: {
    default: 'Matheus Felipe · Full Stack Developer',
    template: '%s · Matheus Felipe',
  },
  description: 'Site pessoal e blog de Matheus Felipe, desenvolvedor Full Stack especializado em JavaScript, React e Node.js',
  metadataBase: new URL('https://xmatheus.dev'),
  openGraph: {
    siteName: 'Matheus Felipe',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/seo/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
}
```

- [ ] **Step 8: Verify all SEO endpoints**

```bash
npm run dev
```

- Visit http://localhost:3000/sitemap.xml — should show XML with home + post URLs
- Visit http://localhost:3000/robots.txt — should show rules + sitemap link
- Visit http://localhost:3000/feed.xml — should show RSS XML with posts
- Visit http://localhost:3000/nonexistent — should show 404 page
- View page source of home — should contain JSON-LD for Person + WebSite
- View page source of a post — should contain JSON-LD for Article + Breadcrumbs

- [ ] **Step 9: Commit**

```bash
git add app/sitemap.ts app/robots.ts app/feed.xml/ app/not-found.tsx app/error.tsx app/layout.tsx
git commit -m "feat: add complete SEO — sitemap, robots, RSS, JSON-LD, error pages"
```

---

### Task 8: Cleanup and build verification

**Files:**
- Delete: `src/` directory (old codebase)
- Delete: `next.config.js` (replaced by `next.config.ts`)
- Delete: `scripts/` (old sitemap generator)
- Keep: `public/` (fonts, seo assets, profile.jpeg)

- [ ] **Step 1: Remove old source files and conflicting public assets**

```bash
rm -rf src/ scripts/ next.config.js .eslintrc* .prettierrc*
# Remove static files that would shadow dynamic App Router routes
rm -f public/robots.txt public/sitemap.xml
# Remove PWA files (next-pwa is being removed)
rm -f public/sw.js public/workbox-*.js public/seo/manifest.webmanifest
```

Note: `public/seo/` images (favicon, og-image) and `public/profile.jpeg` are kept as-is.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: Build succeeds. All pages statically generated. No warnings about missing files.

- [ ] **Step 3: Start production server and verify**

```bash
npm run start
```

Manually check:
- Home page loads with correct layout
- Blog posts load with correct content and syntax highlighting
- Theme toggle works and persists
- View source shows correct metadata, JSON-LD, Open Graph tags
- Sitemap, robots.txt, RSS feed are accessible and correct

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove old Next.js 12 source files"
```

---

### Task 9: Final SEO audit

- [ ] **Step 1: Run Lighthouse audit**

Open Chrome DevTools → Lighthouse → run audit for Performance, Accessibility, Best Practices, SEO.

Target: 100 on SEO, 95+ on others.

- [ ] **Step 2: Fix any Lighthouse findings**

Common fixes: missing `alt` attributes, color contrast issues, missing `meta` tags, font loading issues.

- [ ] **Step 3: Validate structured data**

Use Google's Rich Results Test to verify JSON-LD for Article, Person, WebSite, and Breadcrumbs are valid.

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: address Lighthouse and structured data audit findings"
```
