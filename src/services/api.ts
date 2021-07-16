import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

type Fields = string[]
export interface Posts {
  title?: string
  summary?: string
  author?: string
  slug?: string
  content?: string
  tags?: string
  createdAt?: {
    iso: string
    formated: string
  }
}

const postsDirectory = join(process.cwd(), 'src/posts')

function getMarkdownsFiles() {
  return fs.readdirSync(postsDirectory)
}

export function getPost(slugOrFilename: string, fields: Fields): Posts {
  const slug = slugOrFilename.replace(/\.md$/, '')
  const directory = join(postsDirectory, `${slug}.md`)
  const markdownContent = fs.readFileSync(directory, 'utf8')
  const { data, content } = matter(markdownContent)

  const post = {}

  fields.forEach(field => {
    if (field === 'slug') post[field] = slug
    if (field === 'content') post[field] = content
    if (data[field]) post[field] = data[field]
  })

  console.log(post)
  return post
}

export function getAllPosts(fields: Fields): Posts[] {
  const markdowns = getMarkdownsFiles()
  const posts = markdowns
    .map(filename => getPost(filename, fields))
    .sort(
      (a, b) =>
        Number(new Date(b.createdAt?.iso)) - Number(new Date(a.createdAt?.iso))
    )

  return posts
}
