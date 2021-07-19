import { FC } from 'react'
import { AppProps } from 'next/app'

import * as S from './style'
import Author from 'src/components/Author'
import RightTools from 'src/components/RightTools'
import { useBurger } from 'src/context/burger'

const completePage: FC<AppProps> = ({ children }) => {
  const { openBurger } = useBurger()

  return (
    <S.Container>
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
