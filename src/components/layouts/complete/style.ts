import styled, { keyframes, css } from 'styled-components'

const fadeOut = keyframes`
  0% {
    visibility:hidden;
    opacity: 0;
    position: fixed;

  }

  20%{
    visibility:hidden;
    opacity: 0;
    position: fixed;
    max-width: 100vw;
    width: 100vw;
    height: 76px;
    left: 0;
    bottom: -76px;
  }

  100% {
    position: fixed;
    z-index: 10;
    visibility:visible;
    margin: 0px auto;
    max-width: 100vw;
    width: 100vw;
    height: 76px;

    top: unset;
    bottom: 0px;
    right: 0;
    left: 0;
    opacity: 1;
  }
`

export const Container = styled.section`
  max-width: 1920px;
  width: 100vw;
  height: 100%;
  display: flex;
  transition: width 0.3s ease-in-out, height 0.3s ease-in-out;

  margin: 0px auto;
  /* border-left: 1px; */
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

  transition: transform 0.4s ease-in-out 0.2s, width 1s ease 0s,
    max-width 1s ease 0s, visibility 1s ease-in-out 0.2s;

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.xl}) {
    position: fixed;
    transform: translateX(-101vw);
    visibility: hidden;
    max-width: 100vw;
    width: 100vw;

    ${({ open }) =>
      open &&
      css`
        visibility: visible;
        z-index: 2;
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
  height: 100vh;
  max-width: 76px;
  width: 100%;

  position: sticky;
  top: 0;
  left: 0;

  transition: max-width 0.2s ease-in-out, height 0.2s ease-in-out,
    width 0.2s ease-in-out;

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.xl}) {
    animation-name: ${fadeOut};
    animation-duration: 1s;
    animation-fill-mode: forwards;

    background-color: ${({ theme }) => theme.colors.background};
    border-top: 0.5px solid ${({ theme }) => theme.colors.divider};
  }
`
