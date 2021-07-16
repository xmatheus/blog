import { FC, useContext, useEffect, useState } from 'react'
import { ThemeContext } from 'styled-components'

import { useTheme } from 'src/context/theme'
import * as S from './style'
import SunSVG from 'src/assets/sun.svg'
import SearchSVG from 'src/assets/search.svg'
import NightSVG from 'src/assets/night.svg'
import ArrowSVG from 'src/assets/top.svg'

const RightTools: FC = () => {
  const { toggleTheme } = useTheme()
  const theme = useContext(ThemeContext)
  const [sun, setSun] = useState(false)

  useEffect(() => {
    if (theme.name === 'dark') {
      setSun(true)
    } else {
      setSun(false)
    }
  }, [theme])

  return (
    <S.Container>
      <S.TopButtonsWrapper>
        <S.Button>
          <SearchSVG />
        </S.Button>

        <S.Button
          onClick={() => {
            toggleTheme()
          }}
        >
          {sun ? <SunSVG /> : <NightSVG />}
        </S.Button>
      </S.TopButtonsWrapper>

      <S.Button
        onClick={() => {
          window.scrollTo(0, 0)
        }}
      >
        <ArrowSVG />
      </S.Button>
    </S.Container>
  )
}

export default RightTools
