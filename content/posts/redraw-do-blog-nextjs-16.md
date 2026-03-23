---
title: 'Redraw do blog: de Next.js 12 para 16'
author: 'Matheus Felipe'
summary: 'Como reescrevi o blog do zero, saindo do Pages Router com styled-components para App Router com Tailwind CSS 4'
tags: 'Next.js, Tailwind CSS, React, Migration'
createdAt: '2026-03-22'
---

## Por que reescrever?

O blog rodava em **Next.js 12** com Pages Router, styled-components e Preact aliado em produção. Funcionava, mas o ecossistema mudou muito desde 2021: Server Components, App Router, Tailwind CSS 4, React 19. Atualizar incrementalmente seria mais trabalho do que começar do zero.

A decisão foi simples: reescrever com a stack atual e aproveitar para repensar o design.

## O que mudou na stack

| Antes | Depois |
|-------|--------|
| Next.js 12 (Pages Router) | Next.js 16 (App Router) |
| styled-components | Tailwind CSS 4 |
| Preact em produção | React 19 nativo |
| `_app.tsx` + `_document.tsx` | `app/layout.tsx` |
| `getStaticProps` / `getStaticPaths` | `generateStaticParams` + `generateMetadata` |
| next-pwa | Removido |
| @svgr/webpack | lucide-react |

## App Router na prática

A maior mudança é conceitual. No Pages Router, cada arquivo em `pages/` é uma rota com funções de data fetching (`getStaticProps`). No App Router, a estrutura de pastas define o layout e o roteamento, e os componentes são **Server Components** por padrão.

O que isso muda no dia a dia:

```tsx
// Antes: pages/[slug].tsx
export async function getStaticPaths() { ... }
export async function getStaticProps({ params }) { ... }
export default function Post({ post }) { ... }

// Depois: app/blog/[slug]/page.tsx
export async function generateStaticParams() { ... }
export async function generateMetadata({ params }) { ... }
export default async function BlogPost({ params }) { ... }
```

O componente da página agora pode ser `async`, buscando dados direto no corpo da função, sem precisar de props intermediárias. Menos boilerplate.

### Metadata API

Antes eu montava `<Head>` manualmente com `next/head`. Agora o Next.js tem uma API nativa que gera `<title>`, Open Graph, Twitter Cards e canonical URLs:

```typescript
export const metadata: Metadata = {
  title: {
    default: 'Matheus Felipe · Full Stack Developer',
    template: '%s · Matheus Felipe',
  },
  openGraph: { siteName: 'Matheus Felipe', type: 'website' },
}
```

Cada página pode exportar `generateMetadata()` para valores dinâmicos. O framework cuida de mesclar com o layout pai.

## Tailwind CSS 4

Styled-components funcionava bem, mas significava manter arquivos `style.ts` ao lado de cada componente. Tailwind simplifica: o estilo fica inline no JSX e não precisa de runtime CSS-in-JS.

A versão 4 do Tailwind trouxe mudanças importantes. A configuração agora é via CSS, não mais `tailwind.config.js`:

```css
@import "tailwindcss";

@theme {
  --color-bg: #000000;
  --color-primary: #fafafa;
  --color-secondary: #a1a1aa;
  --color-accent: #6366f1;
}
```

Um detalhe que me pegou: o reset do Tailwind 4 (preflight) já cuida de `margin`, `padding` e `box-sizing`. Se você adicionar um `* { margin: 0; }` manual no CSS, vai sobrescrever utilitários como `mx-auto` e quebrar a centralização do layout. Perdi um tempo com isso.

## Dark mode sem flash

O tema dark/light precisa ser aplicado **antes** do primeiro paint, senão o usuário vê um flash branco. A solução é um script bloqueante no `<head>`:

```typescript
const themeScript = `
  (function() {
    try {
      var t = localStorage.getItem('theme');
      var theme = (t === 'light' || t === 'dark') ? t : 'dark';
      document.documentElement.classList.add(theme);
    } catch(e) {
      document.documentElement.classList.add('dark');
    }
  })();
`
```

O CSS default do `body` assume dark. O script só precisa adicionar a classe, não remove nada. E o `<html>` usa `suppressHydrationWarning` porque o servidor renderiza sem a classe, mas o script a adiciona antes do React hidratar.

## SEO

O blog antigo tinha SEO básico. Na reescrita, cobri tudo que o Lighthouse pede:

- **Sitemap dinâmico** (`app/sitemap.ts`), gerado a partir dos posts
- **robots.txt dinâmico** (`app/robots.ts`)
- **RSS feed** (`app/feed.xml/route.ts`)
- **JSON-LD**: `WebSite`, `Person`, `Article` e `BreadcrumbList`
- **Canonical URLs** em todas as páginas
- **Open Graph + Twitter Cards** com `generateMetadata`

Tudo nativo do Next.js, sem plugins.

## O papel da IA na migração

Usei LLM como copiloto durante a reescrita. O valor maior foi na parte mecânica: migrar frontmatter dos posts, gerar boilerplate de SEO (JSON-LD, sitemap), e fazer o scaffolding inicial da estrutura do App Router. São tarefas repetitivas onde a IA economiza tempo sem comprometer a qualidade.

As decisões de design, arquitetura e os ajustes finos continuam sendo humanos. A IA não sabe como o *seu* blog precisa se sentir.

## Pipeline de conteúdo

O pipeline de Markdown ficou praticamente igual: `gray-matter` para frontmatter + `remark` com `remark-gfm` e `remark-html`. Os posts continuam como arquivos `.md` no repositório, sem CMS, sem banco de dados.

O frontmatter ficou mais simples:

```yaml
# Antes
createdAt:
  iso: '2021-07-31T03:00:00.000Z'
  formated: '31/07/2021'

# Depois
createdAt: '2021-07-31'
```

A formatação de data agora é feita no componente com `toLocaleDateString`.

## O que eu faria diferente

- **Syntax highlighting**: `remark-prism` deu problemas com Turbopack. Da próxima vez, usaria `shiki` desde o início, que funciona melhor com o ecossistema atual.
- **Começar pelo mobile**: desenhei pensando em desktop e ajustei para mobile depois. O inverso funciona melhor.

## Resultado

O blog agora roda em Next.js 16, carrega mais rápido (sem runtime CSS-in-JS), tem SEO completo, e o código é mais simples de manter. O design ficou minimalista, com conteúdo em foco e sem distrações.

O código é open source: [github.com/xmatheus/blog](https://github.com/xmatheus/blog)
