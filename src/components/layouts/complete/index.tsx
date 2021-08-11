import { FC, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { AppProps } from 'next/app'
import NextNprogress from 'nextjs-progressbar'

import * as S from './style'
import Author from 'src/components/Author'
import RightTools from 'src/components/RightTools'
import { useBurger } from 'src/context/burger'

const completePage: FC<AppProps> = ({ children }) => {
  const { openBurger } = useBurger()
  const theme = useContext(ThemeContext)

  return (
    <S.Container>
      <NextNprogress
        color={theme.colors.primary}
        startPosition={0.1}
        stopDelayMs={100}
        height={2}
        showOnShallow={true}
        options={{ easing: 'ease-in-out', speed: 500, showSpinner: false }}
      />
      <S.LeftMenu open={openBurger}>
        <Author />
      </S.LeftMenu>
      <S.Main>{children}</S.Main>
      <S.RightMenu>
        <RightTools />
      </S.RightMenu>
    </S.Container>
  )
}

export default completePage
