import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  height: 100%;
  width: 100%;

  @media screen and (max-width: 1200px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1200px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 96%;
  }
`

export const TopButtonsWrapper = styled.div`
  margin-top: 23px;

  @media screen and (max-width: 1200px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 0px;

    > button {
      margin-right: 40px;
    }
  }
`

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* padding: 8px 10px; */

  width: 36px;
  height: 35px;

  background: ${({ theme }) => theme.colors.backgroundDiv};
  border-radius: 5px;

  border: none;
  outline: none;

  cursor: pointer;

  @media screen and (max-width: 1200px) {
    width: 48px;
    height: 48px;
  }

  path {
    stroke: ${({ theme }) => theme.colors.text};
  }

  :nth-of-type(2) {
    margin-top: 16px;

    @media screen and (max-width: 1200px) {
      margin-top: 0px;
    }
  }

  :last-of-type {
    margin-bottom: 40px;

    @media screen and (max-width: 1200px) {
      margin-bottom: 0px;
    }
  }
`
