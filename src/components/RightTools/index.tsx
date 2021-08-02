import { FC, useContext, useEffect, useState } from 'react'
import { ThemeContext } from 'styled-components'

import { useTheme } from 'src/context/theme'
import * as S from './style'
import SunSVG from 'src/assets/sun.svg'
// import SearchSVG from 'src/assets/search.svg'
import NightSVG from 'src/assets/night.svg'
import ArrowSVG from 'src/assets/top.svg'
import { useBurger } from 'src/context/burger'

const RightTools = (): JSX.Element => {
  const { toggleTheme } = useTheme()
  const theme = useContext(ThemeContext)
  const [sun, setSun] = useState(false)
  const { openBurger, setBurger } = useBurger()

  useEffect(() => {
    if (theme.name === 'dark') {
      setSun(true)
    } else {
      setSun(false)
    }
  }, [theme])

  return (
    <S.Container>
      <S.Wrapper>
        <S.TopButtonsWrapper>
          <S.Button>
            {/* <SearchSVG /> */}
            <S.BurgerMenu
              onClick={() => {
                setBurger(!openBurger)
              }}
            >
              <input type="checkbox" name="" id="burger-check" />
              <span></span>
            </S.BurgerMenu>
          </S.Button>

          <S.Button
            onClick={() => {
              toggleTheme()
            }}
            title={
              'Botão que altera o tema do site. Tema atual = ' + theme.name
            }
          >
            {sun ? <SunSVG /> : <NightSVG />}
          </S.Button>
        </S.TopButtonsWrapper>

        <S.Button
          onClick={() => {
            window.scrollTo(0, 0)
          }}
          title="Botão que leva para o topo da página"
        >
          <ArrowSVG />
        </S.Button>
      </S.Wrapper>
    </S.Container>
  )
}

export default RightTools
