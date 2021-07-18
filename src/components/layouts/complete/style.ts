import styled from 'styled-components'

export const Container = styled.section`
  width: 100vw;
  height: 100%;
  display: flex;
`
export const LeftMenu = styled.aside`
  /* min-height: 100vh; */
  height: 100vh;

  max-width: 315px;
  min-width: 315px;
  width: 100%;

  position: sticky;
  top: 0;
  left: 0;

  border-right: 1px solid ${props => props.theme.colors.divider};

  @media screen and (max-width: 1200px) {
    position: absolute;
    transform: translateX(-110vw);
  }
`

export const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  height: 100%;
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

  @media screen and (max-width: 1200px) {
    position: fixed;
    transform: translateX(-110vw);
    margin: 0px auto;
    max-width: 100vw;
    width: 100vw;
    height: 56px;
    top: 100%;
    transform: translateY(-100%);

    background-color: ${({ theme }) => theme.colors.background};
    border-top: 0.5px solid ${({ theme }) => theme.colors.divider};
  }
`
