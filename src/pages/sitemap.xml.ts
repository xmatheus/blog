import type { APIRoute } from 'astro'
import { getAllPosts, postUrl } from '@/lib/posts'
import { SITE } from '@/config/site'

interface SitemapEntry {
  url: string
  lastModified: Date
  changeFrequency: 'weekly' | 'monthly'
  priority: number
}

export const GET: APIRoute = async () => {
  const posts = await getAllPosts()
  const entries: SitemapEntry[] = [
    { url: SITE.url, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...posts.map(post => ({
      url: `${SITE.url}${postUrl(post)}`,
      lastModified: new Date(post.data.updatedAt || post.data.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  const urls = entries
    .map(
      e => `<url>
<loc>${e.url}</loc>
<lastmod>${e.lastModified.toISOString()}</lastmod>
<changefreq>${e.changeFrequency}</changefreq>
<priority>${e.priority}</priority>
</url>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
}
