import type { APIRoute } from 'astro'
import { getAllPosts, postUrl } from '@/lib/posts'
import { SITE } from '@/config/site'

export const GET: APIRoute = async () => {
  const posts = await getAllPosts()
  const items = posts
    .map(
      post => `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <link>${SITE.url}${postUrl(post)}</link>
      <guid isPermaLink="true">${SITE.url}${postUrl(post)}</guid>
      <pubDate>${new Date(post.data.createdAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.data.summary}]]></description>
    </item>`,
    )
    .join('')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE.name}</title>
    <link>${SITE.url}</link>
    <description>${SITE.description}</description>
    <language>${SITE.lang}</language>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new Response(feed, { headers: { 'Content-Type': 'application/xml' } })
}
