import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  /* height: 100%; */
  display: flex;

  /* background: #ccc; */
`

export const WrapperUserInfo = styled.div`
  margin-top: 56px;
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
    margin-left: 16px;
    display: flex;
    flex-direction: column;

    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */

    letter-spacing: 0.03em;

    color: ${({ theme }) => theme.colors.text};

    small {
      margin-top: 8px;

      font-weight: 500;
      font-size: 16px;
      line-height: 19px;

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
  font-size: 16px;
  line-height: 22.4px;
  letter-spacing: 0px;

  color: ${({ theme }) => theme.colors.subText};
`

export const WrapperIcons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 24px;
  margin-left: -1px;

  path {
    stroke: ${({ theme }) => theme.colors.subText};
    transition: all 0.4s ease-in-out;
  }

  a {
    width: 16px;
    margin-right: 24px;
  }

  a:hover {
    path {
      stroke: ${({ theme }) => theme.colors.primary};
    }
  }
`
