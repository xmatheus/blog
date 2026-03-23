import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getAllSlugs, getPost } from '@/lib/posts'
import { markdownToHtml } from '@/lib/markdown'
import { SITE_URL, AUTHOR } from '@/lib/constants'
import PrismHighlight from '@/components/PrismHighlight'

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

      <article className="flex flex-col gap-8">
        <div className="animate-in">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-quaternary-color transition-colors hover:text-primary-color group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            <span>Voltar</span>
          </Link>
        </div>

        <header className="flex flex-col gap-3 animate-in delay-1">
          <h1 className="text-2xl font-semibold tracking-tight leading-tight text-pretty">
            {post.title}
          </h1>
          <p className="text-secondary-color leading-relaxed text-pretty">
            {post.summary}
          </p>
          <div className="flex items-center gap-3 text-sm text-quaternary-color">
            <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
            <span>&middot;</span>
            <span>{post.timeToRead}</span>
          </div>
        </header>

        {/* Safe: HTML is from local trusted .md files processed at build time via remark */}
        <div className="prose-custom animate-in delay-2" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        <PrismHighlight />
      </article>
    </>
  )
}
