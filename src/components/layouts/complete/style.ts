import styled from 'styled-components'

export const Container = styled.section`
  width: 100vw;
  height: 100%;
  display: flex;
`
export const LeftMenu = styled.aside`
  height: 100vh;
  max-width: 315px;
  min-width: 315px;
  width: 100%;

  position: sticky;
  top: 0;
  left: 0;

  border-right: 1px solid ${props => props.theme.colors.divider};
`
export const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  height: 100%;
`
export const RightMenu = styled.aside`
  /* border-left: 1px solid ${props => props.theme.colors.divider}; */
  height: 100vh;
  max-width: 76px;
  width: 100%;

  position: sticky;
  top: 0;
  left: 0;
`
