import { GetStaticProps } from 'next'
import PostContent from 'src/components/PostContent'
import { getPost, getAllPosts, Posts } from 'src/services/api'
import markdown from 'src/services/markdown.js'

export interface IPosts {
  post: Posts
}

const Page = ({ post }: IPosts): JSX.Element => {
  return <PostContent post={post} />
}

export default Page

type GetStaticResponse = {
  params: { slug: string }
}

export const getStaticProps: GetStaticProps = async ({
  params
}: GetStaticResponse) => {
  const post = getPost(params.slug, [
    'title',
    'summary',
    'slug',
    'content',
    'createdAt'
  ])

  post.content = await markdown.toHTML(post.content)

  return {
    props: { post }
  }
}
type GetStaticPathsResult = {
  paths: Array<{ params: { slug: string } }>
  fallback?: boolean
}

// Usamos a função do Next.js, getStaticPaths()
export const getStaticPaths = (): GetStaticPathsResult => {
  // Buscamos todos os slugs e date de todos os posts
  const posts = getAllPosts(['slug', 'createdAt'])

  return {
    paths: posts.map(post => ({
      params: {
        slug: post.slug
      }
    })),

    fallback: false
  }
}