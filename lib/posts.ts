import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  author: string
  summary: string
  tags: string[]
  createdAt: string
  updatedAt?: string
  content: string
  timeToRead: string
}

function calculateTimeToRead(content: string): string {
  const wpm = 225
  const words = content.trim().split(/\s+/).length
  const time = Math.ceil(words / wpm)
  return `${time} min`
}

export function getPost(slug: string): Post {
  const filePath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title,
    author: data.author,
    summary: data.summary,
    tags: data.tags.split(',').map((t: string) => t.trim()),
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    content,
    timeToRead: calculateTimeToRead(content),
  }
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'))
  return files
    .map(file => getPost(file.replace(/\.md$/, '')))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getAllSlugs(): string[] {
  return fs.readdirSync(postsDirectory)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''))
}
