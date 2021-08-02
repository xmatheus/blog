import styled from 'styled-components'

export const MyA = styled.a`
  text-decoration: none;
  outline: none;
  display: flex;
  width: auto;
  /* min-height: 143px; */
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
  display: flex;

  width: auto;

  min-height: 143px;

  width: 95%;
  border-radius: 5px;

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
  margin-left: ${({ theme }) => theme.spacing.xsmall};

  h2 {
    margin-top: ${({ theme }) => theme.spacing.xsmall};
    font-style: normal;
    font-weight: bold;
    font-size: ${({ theme }) => theme.font.xlarge};
    line-height: ${({ theme }) => theme.font.defaultLineHeight};

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

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.xl}) {
    display: none;
  }
`

export const Summary = styled.p`
  margin-top: 8px;
  font-style: normal;
  font-weight: normal;
  font-size: ${({ theme }) => theme.font.small.size};
  line-height: ${({ theme }) => theme.font.defaultLineHeight};

  text-decoration: none;

  color: ${({ theme }) => theme.colors.subText};
`

export const Canvas = styled.canvas`
  width: 143px;
  height: 143px;

  background-color: ${({ theme }) => theme.colors.background};
  margin-right: ${({ theme }) => theme.spacing.xsmall};

  image-rendering: pixelated;
  /* image-rendering: crisp-edges; */

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
  font-size: ${({ theme }) => theme.font.xxsmall.size};
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
    }
  }
`
export const WrapperTags = styled.div`
  display: flex;
  margin-top: 26px;
`

export const Tag = styled.p`
  margin-right: ${({ theme }) => theme.spacing.xsmall};

  font-size: ${({ theme }) => theme.font.xsmall};

  color: ${({ theme }) => theme.colors.primary};
`
