import { FC } from 'react'
import { AppProps } from 'next/app'

import * as S from './style'
import Author from 'src/components/Author'
import RightTools from 'src/components/RightTools'

const completePage: FC<AppProps> = ({ children }) => {
  return (
    <S.Container>
      <S.LeftMenu>
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
