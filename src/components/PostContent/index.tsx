import { FC } from 'react'
import { useRouter } from 'next/router'

import * as S from './style'
import ArrowSVG from 'src/assets/top.svg'
import EyeSVG from 'src/assets/eye.svg'
import CalendarSVG from 'src/assets/calendar.svg'

interface PostProps {
  post: {
    title?: string
    summary?: string
    slug?: string
    content?: string
    createdAt?: {
      iso: string
      formated: string
    }
  }
}

function timeToRead(content: string): string {
  const wpm = 225
  const words = content.trim().split(/\s+/).length
  const time = Math.ceil(words / wpm)

  return `${time} min de leitura`
}

const PostContent: FC<PostProps> = ({ post }) => {
  const router = useRouter()
  return (
    <S.Wrapper>
      <S.Header>
        <S.BackButton onClick={router.back} tabIndex={0}>
          <ArrowSVG />
          <p>Voltar</p>
        </S.BackButton>

        <S.Title>{post.title}</S.Title>
        <S.Summary>{post.summary}</S.Summary>

        <S.BellowText>
          <S.WrapperTimeRead>
            <CalendarSVG />

            <time>{post.createdAt.formated}</time>
          </S.WrapperTimeRead>

          <S.WrapperTimeRead>
            <EyeSVG />
            {timeToRead(post.content)}
          </S.WrapperTimeRead>
        </S.BellowText>
      </S.Header>

      <S.Content dangerouslySetInnerHTML={{ __html: post.content }} />
    </S.Wrapper>
  )
}

export default PostContent
