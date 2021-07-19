import styled from 'styled-components'

export const Container = styled.section`
  width: 100vw;
  height: 100%;
  display: flex;
  transition: all 0.3s ease-in-out;
`

interface BurgerMenu {
  open: boolean
}

export const LeftMenu = styled.aside<BurgerMenu>`
  /* min-height: 100vh; */
  height: 100vh;

  max-width: 315px;
  min-width: 315px;
  width: 100%;

  position: sticky;
  top: 0;
  left: 0;

  border-right: 1px solid ${props => props.theme.colors.divider};
  background-color: ${({ theme }) => theme.colors.background};

  transition: transform 0.4s ease-in-out, width 1s ease, max-width 1s ease;

  @media screen and (max-width: 1200px) {
    position: fixed;
    transform: translateX(-110vw);

    ${({ open }) =>
      open &&
      `
      max-width: 100vw;
      width:100vw;
      z-index:2;
      transform: translateX(0);
    `}/*
    position: fixed;
    top: 0;
    left:0;
    right: 0;

    width: 100vw;
    height: 76px; */
  }
`

export const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  height: 100%;

  @media screen and (max-width: 1200px) {
    margin-bottom: 26px;
  }
`
export const RightMenu = styled.aside`
  /* border-left: 1px solid ${props => props.theme.colors.divider}; */
  height: 100vh;
  /* height: 100%; */
  max-width: 76px;
  width: 100%;

  position: sticky;
  top: 0;
  left: 0;

  transition: all 0.2s ease-in-out;

  @media screen and (max-width: 1200px) {
    z-index: 10;
    position: fixed;
    /* transform: translateX(-110vw); */
    margin: 0px auto;
    max-width: 100vw;
    width: 100vw;
    height: 76px;
    bottom: 0px;
    right: 0;
    left: 0;
    top: unset;
    /* top: 100%; */
    /* transform: translateY(-100%); */

    background-color: ${({ theme }) => theme.colors.background};
    border-top: 0.5px solid ${({ theme }) => theme.colors.divider};
  }
`
