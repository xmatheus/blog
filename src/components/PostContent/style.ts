import styled from 'styled-components'

export const Wrapper = styled.section`
  margin: 0px auto;
  max-width: 988px;
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
  font-style: normal;
  font-weight: bold;
  font-size: ${({ theme }) => theme.font.mxxlarge.size};
  line-height: ${({ theme }) => theme.font.mxxlarge.lineHeight};
  letter-spacing: 0.02em;

  margin-bottom: ${({ theme }) => theme.spacing.xsmall};

  color: ${({ theme }) => theme.colors.text};

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.xl}) {
    font-size: ${({ theme }) => theme.font.mxlarge.size};
    line-height: ${({ theme }) => theme.font.mxlarge.lineHeight};
  }
`

export const Summary = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: ${({ theme }) => theme.font.xlarge.size};
  line-height: ${({ theme }) => theme.font.defaultLineHeight};

  color: ${({ theme }) => theme.colors.subText};

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.xl}) {
    font-size: ${({ theme }) => theme.font.large.size};
    line-height: ${({ theme }) => theme.font.defaultLineHeight};
  }
`

export const BackButton = styled.button`
  border: none;
  outline: none;
  padding: 0px;
  margin: 0px;
  border-radius: 5px;

  margin-top: ${({ theme }) => theme.spacing.xxlarge};
  margin-bottom: 48px;

  width: 133px;
  height: 35px;

  background-color: ${({ theme }) => theme.colors.backgroundDiv};

  display: flex;
  align-items: center;
  justify-content: flex-start;

  cursor: pointer;

  :hover {
    p {
      color: ${({ theme }) => theme.colors.primary};
    }
    path {
      stroke: ${({ theme }) => theme.colors.primary};
    }
  }

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.xl}) {
    margin-top: 40px;
  }

  svg {
    margin-left: 26px;
    transform: rotate(-90deg);
  }

  path {
    transition: all 0.3s ease-in-out;
    stroke: ${({ theme }) => theme.colors.text};
  }

  p {
    font-family: 'Inter';
    font-weight: 500;
    font-size: ${({ theme }) => theme.font.xxsmall.size};
    line-height: 17px;
    margin-left: ${({ theme }) => theme.spacing.xsmall};
    color: ${({ theme }) => theme.colors.text};

    transition: all 0.3s ease-in-out;
  }
`
export const BellowText = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;

  font-style: normal;
  font-weight: normal;
  font-size: ${({ theme }) => theme.font.xxsmall.size};
  line-height: 17px;

  color: ${({ theme }) => theme.colors.subText};

  margin-top: 40px;

  time {
    margin-right: 50px;
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
export const Content = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.xxxlarge};
  margin-bottom: ${({ theme }) => theme.spacing.medium};

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.xl}) {
    padding-bottom: ${({ theme }) => theme.spacing.mxlarge};
  }

  p {
    margin: ${({ theme }) => theme.spacing.xsmall} 0px;
    font-style: normal;
    font-weight: normal;
    font-size: ${({ theme }) => theme.font.medium.size};
    line-height: 33.6px;

    color: ${({ theme }) => theme.colors.textContent};

    @media screen and (max-width: ${({ theme: { breakpoints } }) =>
        breakpoints.xl}) {
      font-size: ${({ theme }) => theme.font.small.size};
      line-height: ${({ theme }) => theme.font.small.line};
    }
  }

  blockquote,
  table,
  pre,
  code {
    width: 100%;
  }

  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  img {
    width: 100%;
    object-fit: cover;
  }

  h2 {
    margin-top: ${({ theme }) => theme.spacing.xxlarge};
    margin-bottom: ${({ theme }) => theme.spacing.small};

    font-style: normal;
    font-weight: bold;
    font-size: ${({ theme }) => theme.font.mlarge.size};
    line-height: ${({ theme }) => theme.font.defaultLineHeight};
    color: ${({ theme }) => theme.colors.text};

    @media screen and (max-width: ${({ theme: { breakpoints } }) =>
        breakpoints.xl}) {
      font-size: ${({ theme }) => theme.font.xxlarge.size};
    }
  }

  h3 {
    margin-top: ${({ theme }) => theme.spacing.small};
    margin-bottom: ${({ theme }) => theme.spacing.xsmall};

    font-size: ${({ theme }) => theme.font.large.size};
    line-height: ${({ theme }) => theme.font.defaultLineHeight};

    @media screen and (max-width: ${({ theme: { breakpoints } }) =>
        breakpoints.xl}) {
      font-size: ${({ theme }) => theme.font.medium.size};
      line-height: 30px;
    }
  }

  h4 {
    margin-top: ${({ theme }) => theme.spacing.small};
    margin-bottom: ${({ theme }) => theme.spacing.xsmall};

    font-size: ${({ theme }) => theme.font.medium.size};
    line-height: 30px;
  }

  pre {
    margin: 33.6px 0px;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    strong {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.bold};
    }
    code {
      background-color: ${({ theme }) => theme.colors.backgroundDiv};
      padding: 4px;
      border-radius: 2px;
    }
  }

  blockquote {
    width: 100%;
    border-left: 0.3rem solid ${({ theme }) => theme.colors.primary};
    padding: 0px 1.9rem;
    margin: 3.2rem auto;

    background-color: ${({ theme }) => theme.colors.backgroundDiv};

    p {
      font-size: ${({ theme }) => theme.font.medium.size};
      color: ${({ theme }) => theme.colors.subText};

      @media screen and (max-width: ${({ theme: { breakpoints } }) =>
          breakpoints.xl}) {
        font-size: ${({ theme }) => theme.font.small.size};
        line-height: ${({ theme }) => theme.font.small.line};
      }
    }
  }

  table {
    margin-top: ${({ theme }) => theme.spacing.xsmall};

    width: 100%;
    border: 0.5px solid ${({ theme }) => theme.colors.divider};

    th {
      padding: 8px;
      border-right: 0.5px solid ${({ theme }) => theme.colors.divider};
      border-bottom: 0.5px solid ${({ theme }) => theme.colors.divider};
      :last-of-type {
        border-right: none;
      }
    }

    code {
      background-color: ${({ theme }) => theme.colors.backgroundDiv};
      padding: 4px;
      border-radius: 2px;
    }

    tbody {
      tr {
        td {
          border-right: 0.5px solid ${({ theme }) => theme.colors.divider};
          border-bottom: 0.5px solid ${({ theme }) => theme.colors.divider};
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
    margin-left: 72px;
  }

  li {
    margin: ${({ theme }) => theme.spacing.xsmall} 0px;
    font-style: normal;
    font-weight: normal;
    font-size: ${({ theme }) => theme.font.medium.size};
    line-height: ${({ theme }) => theme.font.defaultLineHeight};

    color: ${({ theme }) => theme.colors.textContent};

    @media screen and (max-width: ${({ theme: { breakpoints } }) =>
        breakpoints.xl}) {
      font-size: ${({ theme }) => theme.font.small.size};
      line-height: ${({ theme }) => theme.font.small.line};
    }
  }
`
