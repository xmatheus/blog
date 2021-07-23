import styled from 'styled-components'

export const Container = styled.section`
  width: 100%;
  display: flex;
`

export const WrapperUserInfo = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxlarge};
  margin-left: 56px;
  width: 100%;
`
export const ImageAndUserName = styled.div`
  width: 100%;
  display: flex;

  img {
    object-fit: cover;
    border-radius: 5px;
  }

  h1 {
    margin-left: ${({ theme }) => theme.spacing.xsmall};
    display: flex;
    flex-direction: column;

    font-style: normal;
    font-weight: bold;
    font-size: ${({ theme }) => theme.font.small.size};
    letter-spacing: 0.03em;

    color: ${({ theme }) => theme.colors.text};

    small {
      margin-top: 8px;

      font-weight: 500;
      font-size: ${({ theme }) => theme.font.xsmall.size};
      line-height: ${({ theme }) => theme.font.defaultLineHeight};

      letter-spacing: 0px;

      color: ${({ theme }) => theme.colors.subText};
    }
  }
`
export const UserDescription = styled.p`
  padding: 0px;
  margin: 0px;
  margin-top: 23px;
  width: 209px;

  font-style: normal;
  font-weight: normal;
  font-size: ${({ theme }) => theme.font.xsmall};
  line-height: ${({ theme }) => theme.font.defaultLineHeight};
  letter-spacing: 0px;

  color: ${({ theme }) => theme.colors.subText};
`

export const WrapperIcons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: ${({ theme }) => theme.spacing.small};
  margin-left: -1px;

  path {
    stroke: ${({ theme }) => theme.colors.subText};
    transition: all 0.4s ease-in-out;
  }

  a {
    width: ${({ theme }) => theme.spacing.xsmall};
    margin-right: ${({ theme }) => theme.spacing.small};
  }

  a:hover {
    path {
      stroke: ${({ theme }) => theme.colors.primary};
    }
  }
`
