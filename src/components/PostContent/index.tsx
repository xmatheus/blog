import { useRouter } from 'next/router'

import * as S from './style'
import ArrowSVG from 'src/assets/top.svg'
import EyeSVG from 'src/assets/eye.svg'
import CalendarSVG from 'src/assets/calendar.svg'
import { Posts } from 'src/services/api'

interface PostProps {
  post: Posts
}

const PostContent = ({ post }: PostProps): JSX.Element => {
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
            <p>{post.timeToRead}</p>
          </S.WrapperTimeRead>
        </S.BellowText>
      </S.Header>

      <S.Content dangerouslySetInnerHTML={{ __html: post.content }} />
    </S.Wrapper>
  )
}

export default PostContent
