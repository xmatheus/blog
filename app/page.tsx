import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts()
  return (
    <main className="mx-auto max-w-[680px] px-4 py-16">
      <h1 className="text-3xl font-bold">Matheus Felipe</h1>
      <p className="mt-2">{posts.length} posts found</p>
      {posts.map(post => (
        <p key={post.slug}>{post.title} — {post.createdAt}</p>
      ))}
    </main>
  )
}
