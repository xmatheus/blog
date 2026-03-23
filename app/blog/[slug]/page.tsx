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
      twitter: { card: 'summary_large_image', title: post.title, description: post.summary },
      alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    }
  } catch { return {} }
}

function formatDate(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`)
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default async function BlogPost(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  let post
  try { post = getPost(slug) } catch { notFound() }

  // Safe: markdown content comes from local trusted .md files processed at build time
  const htmlContent = await markdownToHtml(post.content)

  const jsonLd = [
    {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: post.title, datePublished: post.createdAt,
      dateModified: post.updatedAt || post.createdAt,
      author: { '@type': 'Person', name: AUTHOR.fullName },
      publisher: { '@type': 'Organization', name: 'xmatheus.dev' },
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${slug}` },
      ],
    },
  ]

  return (
    <>
      {/* Safe: JSON-LD uses hardcoded constants and trusted post metadata */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
        {/* Safe: HTML is from local trusted .md files processed at build time via remark */}
        <div className="prose-custom" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </article>
    </>
  )
}
