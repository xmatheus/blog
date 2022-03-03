import styled, { css } from 'styled-components'

export const Wrapper = styled.section`
  margin: 0px auto;
  max-width: 900px;
  width: 96%;

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.xl}) {
    max-width: unset;
  }
`

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`

export const Title = styled.h1`
  ${({ theme }) => css`
    font-style: normal;
    font-weight: bold;
    font-size: ${theme.font.mxxlarge.size};
    line-height: ${theme.font.mxxlarge.lineHeight};
    letter-spacing: 0.02em;
    margin-bottom: ${theme.spacing.large};
    color: ${theme.colors.text};

    @media screen and (max-width: ${({ theme: { breakpoints } }) =>
        breakpoints.xl}) {
      font-size: ${theme.font.mxlarge.size};
      line-height: ${theme.font.mxlarge.lineHeight};
    }
  `}
`

export const Summary = styled.p`
  ${({ theme }) => css`
    font-style: normal;
    font-weight: normal;
    font-size: ${theme.font.xlarge.size};
    line-height: ${theme.font.defaultLineHeight};
    color: ${theme.colors.subText};

    @media screen and (max-width: ${({ theme: { breakpoints } }) =>
        breakpoints.xl}) {
      font-size: ${theme.font.large.size};
      line-height: ${theme.font.defaultLineHeight};
    }
  `}
`

export const BackButton = styled.button`
  ${({ theme }) => css`
    border: none;
    outline: none;
    padding: 0px;
    margin: 0px;
    border-radius: 5px;
    margin-top: ${theme.spacing.xxlarge};
    margin-bottom: 48px;
    width: 133px;
    height: 35px;
    background-color: ${theme.colors.backgroundDiv};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;

    :focus {
      border: 1px solid ${theme.colors.text};
    }

    :hover {
      p {
        color: ${theme.colors.primary};
      }
      path {
        stroke: ${theme.colors.primary};
      }
    }

    @media screen and (max-width: ${({ theme: { breakpoints } }) =>
        breakpoints.xl}) {
      margin-top: 40px;
    }

    a {
      display: flex;
    }

    svg {
      margin-left: 26px;
      transform: rotate(-90deg);
    }

    path {
      stroke: ${theme.colors.text};
    }

    p {
      font-weight: 500;
      font-size: ${theme.font.xxsmall.size};
      line-height: 17px;
      margin-left: ${theme.spacing.xsmall};
      color: ${theme.colors.text};
    }
  `}
`
export const BellowText = styled.div`
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
    margin-top: 40px;

    time {
      margin-right: 50px;
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
export const Content = styled.div`
  ${({ theme }) => css`
    width: 100%;
    margin-top: ${theme.spacing.xxxlarge};
    margin-bottom: ${theme.spacing.medium};

    @media screen and (max-width: ${({ theme: { breakpoints } }) =>
        breakpoints.xl}) {
      padding-bottom: ${theme.spacing.mxlarge};
    }

    p {
      margin: ${theme.spacing.xsmall} 0px;
      font-style: normal;
      font-weight: normal;
      font-size: ${theme.font.medium.size};
      line-height: ${theme.font.medium.line};
      color: ${theme.colors.textContent};

      @media screen and (max-width: ${({ theme: { breakpoints } }) =>
          breakpoints.xl}) {
        font-size: ${theme.font.small.size};
        line-height: ${theme.font.small.line};
      }

      strong {
        font-weight: bold;
        color: ${theme.colors.bold};
      }
      code {
        background-color: ${theme.colors.backgroundDiv};
        padding: 4px;
        border-radius: 2px;
      }
    }

    blockquote,
    table,
    pre,
    code,
    img,
    video {
      width: 100%;
    }

    figure {
      margin: ${theme.spacing.xsmall} 0px;
    }

    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
      margin: 33.6px 0px;

      span {
        font-size: ${theme.font.xsmall.size};
      }
    }

    img {
      object-fit: cover;
    }

    h2 {
      margin-top: ${theme.spacing.xxlarge};
      margin-bottom: ${theme.spacing.large};
      font-style: normal;
      font-weight: bold;
      font-size: ${theme.font.mlarge.size};
      line-height: ${theme.font.defaultLineHeight};
      color: ${theme.colors.text};

      @media screen and (max-width: ${({ theme: { breakpoints } }) =>
          breakpoints.xl}) {
        font-size: ${theme.font.xxlarge.size};
      }
    }

    h3 {
      margin-top: ${theme.spacing.small};
      margin-bottom: ${theme.spacing.xsmall};
      font-size: ${theme.font.large.size};
      line-height: ${theme.font.defaultLineHeight};

      @media screen and (max-width: ${({ theme: { breakpoints } }) =>
          breakpoints.xl}) {
        font-size: ${theme.font.medium.size};
        line-height: 30px;
      }
    }

    h4 {
      margin-top: ${theme.spacing.small};
      margin-bottom: ${theme.spacing.xsmall};
      font-size: ${theme.font.medium.size};
      line-height: 30px;
    }

    a {
      color: ${theme.colors.primary};
      word-break: break-word;
    }

    blockquote {
      width: 100%;
      border-left: 0.3rem solid ${theme.colors.primary};
      padding-top: ${theme.spacing.bit};
      padding-bottom: ${theme.spacing.bit};
      padding-left: ${theme.spacing.medium};
      padding-right: ${theme.spacing.medium};
      margin: 3.2rem auto;
      background-color: ${theme.colors.backgroundDiv};

      p {
        font-size: ${theme.font.medium.size};
        color: ${theme.colors.subText};

        @media screen and (max-width: ${({ theme: { breakpoints } }) =>
            breakpoints.xl}) {
          font-size: ${theme.font.xsmall.size};
          line-height: ${theme.font.xsmall.line};
        }
      }
    }

    table {
      margin-top: ${theme.spacing.xsmall};
      width: 100%;
      border: 0.5px solid ${theme.colors.divider};

      th {
        padding: 8px;
        border-right: 0.5px solid ${theme.colors.divider};
        border-bottom: 0.5px solid ${theme.colors.divider};
        :last-of-type {
          border-right: none;
        }
      }

      code {
        background-color: ${theme.colors.backgroundDiv};
        padding: 4px;
        border-radius: 2px;
      }

      tbody {
        tr {
          td {
            border-right: 0.5px solid ${theme.colors.divider};
            border-bottom: 0.5px solid ${theme.colors.divider};
            :last-of-type {
              border-right: none;
            }
            padding: 8px;
          }
          :last-of-type td {
            border-bottom: none;
          }
        }
      }
    }

    ul,
    ol {
      margin: 32px 0px;
      margin-left: 40px;
    }

    li {
      margin: ${theme.spacing.xsmall} 0px;
      font-style: normal;
      font-weight: normal;
      font-size: ${theme.font.medium.size};
      line-height: ${theme.font.defaultLineHeight};
      color: ${theme.colors.textContent};

      @media screen and (max-width: ${({ theme: { breakpoints } }) =>
          breakpoints.xl}) {
        font-size: ${theme.font.small.size};
        line-height: ${theme.font.small.line};
      }
      ::marker {
        color: ${theme.colors.text};
      }
    }
  `}
`
