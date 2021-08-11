import styled, { css } from 'styled-components'

export const MyA = styled.a`
  text-decoration: none;
  outline: none;
  display: flex;
  width: auto;
  width: 95%;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 64px;
  transition: padding 0.4s ease-in-out;

  :focus {
    outline: -webkit-focus-ring-color auto 5px;
  }
`

export const Container = styled.article`
  ${({ theme }) => css`
    display: flex;
    width: auto;
    min-height: 143px;
    width: 95%;
    border-radius: 5px;

    :hover #divider {
      width: 1px;
      background-color: ${theme.colors.primary};
    }

    :hover svg {
      path {
        stroke: ${theme.colors.primary};
      }
    }

    :hover h2 {
      color: ${theme.colors.primary};
    }
  `}
`

export const TextContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-left: ${theme.spacing.xsmall};

    h2 {
      margin-top: ${theme.spacing.xsmall};
      font-style: normal;
      font-weight: bold;
      font-size: ${theme.font.xlarge};
      line-height: ${theme.font.defaultLineHeight};
      color: ${theme.colors.text};
    }

    @media screen and (max-width: ${({ theme: { breakpoints } }) =>
        breakpoints.xl}) {
      margin-left: 0px;
    }
  `}
`

export const Divider = styled.div`
  height: auto;
  width: 1px;
  background-color: ${({ theme }) => theme.colors.divider};

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.xl}) {
    display: none;
  }
`

export const Summary = styled.p`
  ${({ theme }) => css`
    margin-top: 8px;
    font-style: normal;
    font-weight: normal;
    font-size: ${theme.font.small.size};
    line-height: ${theme.font.defaultLineHeight};
    text-decoration: none;
    color: ${theme.colors.subText};
  `}
`

export const Canvas = styled.canvas`
  ${({ theme }) => css`
    width: 143px;
    height: 143px;
    background-color: ${theme.colors.background};
    margin-right: ${theme.spacing.xsmall};
    image-rendering: pixelated;

    @media screen and (max-width: ${({ theme: { breakpoints } }) =>
        breakpoints.xl}) {
      display: none;
      width: 94px;
      height: 94px;
    }
  `}
`

export const TopText = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    font-style: normal;
    font-weight: normal;
    font-size: ${theme.font.xxsmall.size};
    line-height: 17px;
    color: ${theme.colors.subText};

    time {
      margin-right: 32px;
    }
  `}
`
export const WrapperTimeRead = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  svg {
    margin-right: 8px;

    path {
      stroke: ${({ theme }) => theme.colors.subText};
    }
  }
`
export const WrapperTags = styled.div`
  display: flex;
  margin-top: 26px;
`

export const Tag = styled.p`
  ${({ theme }) => css`
    margin-right: ${theme.spacing.xsmall};
    font-size: ${theme.font.xsmall};
    color: ${theme.colors.primary};
  `}
`
