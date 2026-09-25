import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    summary: z.string(),
    // Frontmatter keeps tags as a comma-separated string
    tags: z.string().transform(tags => tags.split(',').map(t => t.trim())),
    createdAt: z.string(),
    updatedAt: z.string().optional(),
  }),
})

export const collections = { posts }
