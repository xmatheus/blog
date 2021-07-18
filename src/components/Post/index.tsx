import { FC, useContext, useEffect, useRef } from 'react'
import { ThemeContext } from 'styled-components'
import Link from 'next/link'

import * as S from './style'
import Eye from 'src/assets/eye.svg'

interface PostProps {
  slug: string
  title: string
  summary: string
  tags: string
  time: string
  content: string
}

const Post: FC<PostProps> = ({ slug, title, summary, tags, time, content }) => {
  const canvasRef = useRef(null)
  const theme = useContext(ThemeContext)

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

    // console.log('size ', size)

    str.split('').forEach((s, idx) => {
      if (idx === str.length - 1) return

      const aux = s.toLowerCase().charCodeAt(0) - 97 + 1

      const x = idx % 2 === 0 ? idx : aux
      const y = x % 2 === 0 ? aux : idx

      ctx.fillStyle = theme.colors.primary
      ctx.fillRect(x, y, 1, 1)

      // console.log(`${str} => ${x} ${y}`)
    })
  }

  function timeToRead(content: string): string {
    const wpm = 225
    const words = content.trim().split(/\s+/).length
    const time = Math.ceil(words / wpm)

    return `${time} min de leitura`
  }

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const context = canvas.getContext('2d')

    drawRectanglePixel(canvas, context, title)
  }, [theme])

  return (
    <Link href={`/${slug}`}>
      <S.MyA title={`Postagem: ${title}`}>
        <S.Container>
          <S.Canvas
            ref={canvasRef}
            title="Imagem gerada com base no titulo"
          ></S.Canvas>
          <S.Divider id="divider" />
          <S.TextContent>
            <S.TopText>
              <time>{time}</time>

              <S.WrapperTimeRead>
                <Eye />
                {timeToRead(content)}
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
      </S.MyA>
    </Link>
  )
}

export default Post
