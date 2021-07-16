import React, { useContext, useEffect, useRef } from 'react'
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

const Post: React.FC<PostProps> = ({
  slug,
  title,
  summary,
  tags,
  time,
  content
}) => {
  const canvasRef = useRef(null)
  const theme = useContext(ThemeContext)

  function drawChess(ctx: CanvasRenderingContext2D, size: Number) {
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

    str.split('').map((s, idx) => {
      if (idx == str.length - 1) return

      let aux = s.toLowerCase().charCodeAt(0) - 97 + 1

      let x = idx % 2 == 0 ? idx : aux
      let y = x % 2 == 0 ? aux : idx

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
  }, [])

  return (
    <S.Container>
      <S.Canvas ref={canvasRef}></S.Canvas>
      <S.Divider id="divider" />
      <S.TextContent>
        <Link href={`/${slug}`}>
          <a title={`Postagem ${title}`}>
            <S.TopText>
              <time>{time}</time>

              <S.WrapperTimeRead>
                <Eye className="eye" />
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
          </a>
        </Link>
      </S.TextContent>
    </S.Container>
  )
}

export default Post
