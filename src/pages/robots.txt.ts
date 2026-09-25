import type { APIRoute } from 'astro'
import { SITE } from '@/config/site'

export const GET: APIRoute = () =>
  new Response(`User-Agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`, {
    headers: { 'Content-Type': 'text/plain' },
  })
