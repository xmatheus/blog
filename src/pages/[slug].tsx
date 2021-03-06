import { GetStaticProps } from 'next'
import Head from 'next/head'

import PostContent from 'src/components/PostContent'
import { generatePostSchema } from 'src/services/seo'
import { getPost, getAllPosts, Posts } from 'src/services/api'
import markdownToHTML from 'src/services/markdown.js'
import timeToRead from 'src/services/timeToRead'

export interface IPosts {
  post: Posts
}

const Page = ({ post }: IPosts): JSX.Element => {
  const schema = generatePostSchema(post)

  return (
    <>
      <Head>
        <title>{post.title} · Blog do Matheus</title>
        <meta name="description" content={post.summary} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <link rel="canonical" href={`https://xmatheus.dev/${post.slug}`}></link>
      </Head>
      <PostContent post={post} />
    </>
  )
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

  post.timeToRead = timeToRead(post.content)
  post.content = await markdownToHTML(post.content)

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
