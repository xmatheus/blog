import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  0% {
    opacity: 0;
    position: fixed;
    max-width: 100vw;
    width: 100vw;
    height: 76px;
    bottom: -76px;

    /* transform: translateX(80px); */
  }

  100% {
    left: 0;
    position: fixed;
    z-index: 10;
    /* position: fixed; */
    margin: 0px auto;
    max-width: 100vw;
    width: 100vw;
    height: 76px;
    bottom: 0px;
    right: 0;
    top: unset;
    opacity: 1;

  }
`

export const Container = styled.section`
  width: 100vw;
  height: 100%;
  display: flex;
  transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
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

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.xl}) {
    position: fixed;
    transform: translateX(-110vw);

    ${({ open }) =>
      open &&
      `
      max-width: 100vw;
      width:100vw;
      z-index:2;
      transform: translateX(0);
    `}
  }
`

export const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  height: 100%;

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.xl}) {
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

  transition: max-width 0.2s ease-in-out, height 0.2s ease-in-out,
    width 0.2s ease-in-out;

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.xl}) {
    animation-name: ${fadeIn};
    animation-duration: 1s;
    animation-fill-mode: forwards;

    background-color: ${({ theme }) => theme.colors.background};
    border-top: 0.5px solid ${({ theme }) => theme.colors.divider};
  }
`
