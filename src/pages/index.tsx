import React, { FC } from 'react'
import Link from 'next/link'
import { getAllPosts, Posts } from 'src/services/api'
import LayoutComplete from 'src/components/layouts/complete'
// import { AppProps } from 'next/app'
import { Page as PageWithMainLayoutType } from 'src/components/layouts'
import { GetStaticPropsResult } from 'next'
import PostsList from 'src/components/PostsList'
import PostComponent from 'src/components/Post'

export interface IPosts {
  posts: Posts[]
}

const Page: FC<IPosts> = ({ posts }) => {
  return (
    <PostsList>
      {posts?.map(post => (
        <PostComponent
          key={post.createdAt.iso}
          time={post.createdAt.formated}
          slug={post.slug}
          title={post.title}
          summary={post.summary}
          tags={post.tags}
          content={post.content}
        ></PostComponent>
      ))}
    </PostsList>
  )
}
;(Page as PageWithMainLayoutType).Layout = LayoutComplete

export default Page

interface Props {
  posts: Posts[]
}

export const getStaticProps = (): GetStaticPropsResult<Props> => {
  const posts = getAllPosts([
    'title',
    'createdAt',
    'slug',
    'summary',
    'tags',
    'content'
  ])

  return {
    props: { posts }
  }
}
