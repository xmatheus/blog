import styled, { css } from 'styled-components'

export const Container = styled.section`
  width: 100%;
  display: flex;
`

export const WrapperUserInfo = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxlarge};
  margin-left: 56px;
  width: 100%;

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.xl}) {
    margin-left: 24px;
    margin-right: 24px;
  }
`
export const ImageAndUserName = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;

    img {
      object-fit: cover;
      border-radius: 5px;

      @media screen and (max-width: ${({ theme: { breakpoints } }) =>
          breakpoints.xl}) {
        width: 94px;
      }
    }

    h1 {
      margin-left: ${theme.spacing.xsmall};
      display: flex;
      flex-direction: column;

      font-style: normal;
      font-weight: bold;
      font-size: ${theme.font.small.size};
      letter-spacing: 0.03em;

      color: ${theme.colors.text};

      @media screen and (max-width: ${({ theme: { breakpoints } }) =>
          breakpoints.xl}) {
        font-size: ${theme.font.xlarge.size};
      }

      small {
        margin-top: 8px;

        font-weight: 500;
        font-size: ${theme.font.xsmall.size};
        line-height: ${theme.font.defaultLineHeight};

        letter-spacing: 0px;

        color: ${theme.colors.subText};

        @media screen and (max-width: ${({ theme: { breakpoints } }) =>
            breakpoints.xl}) {
          font-size: ${theme.font.medium.size};
        }
      }
    }
  `}
`

export const UserDescription = styled.p`
  ${({ theme }) => css`
    padding: 0px;
    margin: 0px;
    margin-top: 23px;
    width: 209px;

    font-style: normal;
    font-weight: normal;
    font-size: ${theme.font.xsmall.size};
    line-height: ${theme.font.defaultLineHeight};
    letter-spacing: 0px;

    color: ${theme.colors.subText};

    @media screen and (max-width: ${({ theme: { breakpoints } }) =>
        breakpoints.xl}) {
      width: 100%;
      font-size: ${theme.font.medium.size};
    }
  `}
`

export const WrapperIcons = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: ${theme.spacing.small};
    margin-left: -1px;

    path {
      stroke: ${theme.colors.subText};
    }

    a {
      width: ${theme.spacing.xsmall};
      margin-right: ${theme.spacing.small};
    }

    a:hover {
      path {
        stroke: ${theme.colors.primary};
      }
      #dribblelIcon {
        fill: ${theme.colors.primary};
      }
    }

    #gitIcon {
      width: 18px;
      height: 20px;
    }

    #igIcon {
      width: 18px;
      height: 18px;
    }

    #emailIcon {
      width: 21px;
      height: 17px;
    }

    #dribblelIcon {
      width: 18px;
      height: 18px;
      object-fit: cover;
      fill: ${theme.colors.subText};
    }

    @media screen and (max-width: ${({ theme: { breakpoints } }) =>
        breakpoints.xl}) {
      #gitIcon {
        width: 26px;
        height: 28px;
      }

      #igIcon {
        width: 26px;
        height: 26px;
      }

      #emailIcon,
      #dribblelIcon {
        width: 29px;
        height: 25px;
      }

      a {
        margin-right: ${theme.spacing.large};
      }
    }
  `}
`
