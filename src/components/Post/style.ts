import styled from 'styled-components'

export const MyA = styled.a`
  text-decoration: none;
  outline: none;

  display: flex;

  width: auto;

  min-height: 143px;

  width: 95%;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;

  cursor: pointer;
`

export const Container = styled.article`
  display: flex;

  width: auto;

  margin-bottom: 64px;
  min-height: 143px;

  width: 95%;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;

  :hover #divider {
    width: 1px;
    background-color: ${({ theme }) => theme.colors.primary};
  }

  :hover svg {
    path {
      stroke: ${({ theme }) => theme.colors.primary};
    }
  }

  :hover h2 {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  margin-left: 16px;

  h2 {
    margin-top: 16px;
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 31px;

    color: ${({ theme }) => theme.colors.text};
  }

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.xl}) {
    margin-left: 0px;
  }
`

export const Divider = styled.div`
  height: auto;
  width: 1px;

  background-color: ${({ theme }) => theme.colors.divider};

  transition: all 0.2s ease-in-out;

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.xl}) {
    display: none;
  }
`

export const Summary = styled.p`
  margin-top: 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;

  text-decoration: none;

  color: ${({ theme }) => theme.colors.subText};
`

export const Canvas = styled.canvas`
  width: 143px;
  height: 143px;

  background-color: ${({ theme }) => theme.colors.background};
  margin-right: 16px;

  image-rendering: pixelated;
  image-rendering: crisp-edges;
  image-rendering: -moz-crisp-edges;

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.xl}) {
    display: none;
    width: 94px;
    height: 94px;
  }
`

export const TopText = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;

  color: ${({ theme }) => theme.colors.subText};

  time {
    margin-right: 32px;
  }
`
export const WrapperTimeRead = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  svg {
    margin-right: 8px;

    path {
      stroke: ${({ theme }) => theme.colors.subText};
      transition: all 0.4s ease-in-out;
    }
  }
`
export const WrapperTags = styled.div`
  display: flex;
  margin-top: 26px;
`

export const Tag = styled.p`
  margin-right: 16px;

  font-size: 16px;
  line-height: 19px;

  color: ${({ theme }) => theme.colors.primary};
`
