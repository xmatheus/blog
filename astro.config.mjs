// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import { unified } from '@astrojs/markdown-remark'
import { rehypePrism } from './src/lib/markdown/rehype-prism'
import { rehypePostHtml } from './src/lib/markdown/rehype-post-html'

export default defineConfig({
  site: 'https://xmatheus.dev',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  prefetch: { prefetchAll: true },
  markdown: {
    // Highlighting is done by our own rehype plugin to keep the exact Prism output
    syntaxHighlight: false,
    processor: unified({
      smartypants: false,
      rehypePlugins: [rehypePrism, rehypePostHtml],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
