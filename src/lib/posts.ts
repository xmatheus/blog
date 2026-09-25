import { getCollection, type CollectionEntry } from 'astro:content'

export type Post = CollectionEntry<'posts'>

const WORDS_PER_MINUTE = 225

export function timeToRead(post: Post): string {
  const words = (post.body ?? '').trim().split(/\s+/).length
  return `${Math.ceil(words / WORDS_PER_MINUTE)} min`
}

export function postUrl(post: Post): string {
  return `/blog/${post.id}`
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('posts')
  return posts.sort((a, b) => new Date(b.data.createdAt).getTime() - new Date(a.data.createdAt).getTime())
}
