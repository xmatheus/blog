import Link from 'next/link'
import type { Post } from '@/lib/posts'

function formatDate(dateStr: string): string {
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
      <h3 className="mt-1 text-lg font-bold group-hover:text-[var(--color-accent)]">{post.title}</h3>
      <p className="mt-1 text-sm text-[var(--color-text-secondary)] line-clamp-2">{post.summary}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {post.tags.map(tag => (
          <span key={tag} className="text-xs text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2 py-0.5 rounded-full">{tag}</span>
        ))}
      </div>
    </Link>
  )
}
