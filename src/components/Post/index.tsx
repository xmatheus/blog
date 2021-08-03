import { useContext, useEffect, useRef } from 'react'
import { ThemeContext } from 'styled-components'
import Link from 'next/link'

import * as S from './style'
import Eye from 'src/assets/eye.svg'
import timeToRead from 'src/services/timeToRead'
import { useBurger } from 'src/context/burger'

interface PostProps {
  slug: string
  title: string
  summary: string
  tags: string
  time: string
  content: string
}

const Post = ({
  slug,
  title,
  summary,
  tags,
  time,
  content
}: PostProps): JSX.Element => {
  const canvasRef = useRef(null)
  const theme = useContext(ThemeContext)
  const { openBurger } = useBurger()

  function drawChess(ctx: CanvasRenderingContext2D, size: number) {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        ctx.fillStyle = theme.colors.background
        ctx.fillRect(j, i, 1, 1)
      }
    }
  }

  function drawRectanglePixel(
    cvs: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    str: string
  ) {
    str = str.replace(/[^\w\s]/gi, '').replace(/\s/gi, '')

    let size = str.split('').length

    size = size < 26 ? 26 : size

    cvs.width = size
    cvs.height = size

    drawChess(ctx, size)

    str.split('').forEach((s, indexInString) => {
      if (indexInString === str.length - 1) return

      const indexInAlphabet = s.toLowerCase().charCodeAt(0) - 97 + 1

      const x = indexInString % 2 === 0 ? indexInString : indexInAlphabet
      const y = x % 2 === 0 ? indexInAlphabet : indexInString

      ctx.fillStyle = theme.colors.primary
      ctx.fillRect(x, y, 1, 1)
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const context = canvas.getContext('2d')

    drawRectanglePixel(canvas, context, title)
  }, [theme])

  return (
    <Link href={`/${slug}`}>
      <a title={`Postagem: ${title}`} tabIndex={openBurger ? -1 : 0}>
        <S.Container>
          <S.Canvas
            ref={canvasRef}
            title="Varios pixels verdes em um grande quadrado, representando uma imagem unica gerada com base no titulo deste post"
          ></S.Canvas>
          <S.Divider id="divider" />
          <S.TextContent>
            <S.TopText>
              <time>{time}</time>

              <S.WrapperTimeRead>
                <Eye title="olho aberto" />
                <p>{timeToRead(content)}</p>
              </S.WrapperTimeRead>
            </S.TopText>

            <div>
              <h2>{title}</h2>
              <S.Summary>{summary}</S.Summary>
            </div>

            <S.WrapperTags>
              {tags.split(',').map(tag => (
                <S.Tag key={slug + tag}>{`#${tag.trim()}`}</S.Tag>
              ))}
            </S.WrapperTags>
          </S.TextContent>
        </S.Container>
      </a>
    </Link>
  )
}

export default Post
