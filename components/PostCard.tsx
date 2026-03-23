import Link from 'next/link'
import type { Post } from '@/lib/posts'

function formatDate(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col gap-0 sm:flex-row sm:items-center sm:gap-2 py-2 -mx-2 px-2 rounded-lg transition-colors hover-bg"
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-primary-color font-medium leading-snug line-clamp-1 group-hover:underline underline-offset-2">
          {post.title}
        </span>
      </div>
      <span className="text-quaternary-color text-sm shrink-0 font-mono tabular-nums">
        {formatDate(post.createdAt)}
      </span>
    </Link>
  )
}
