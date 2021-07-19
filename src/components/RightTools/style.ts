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
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 1200px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 96%;
    height: 100%;
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

  @media screen and (min-width: 1200px) {
    button:first-of-type {
      display: none;
    }
    button:nth-of-type(2) {
      margin-top: 0px;
    }
  }
`

export const Button = styled.button`
  display: flex;
  flex-direction: column;
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
    margin-bottom: 23px;

    @media screen and (max-width: 1200px) {
      margin-bottom: 0px;
    }
  }
`

export const BurgerMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  position: relative;

  input {
    position: absolute;
    width: 100%;
    height: 100%;
    /* visibility: hidden; */
    opacity: 0;
    z-index: 3;
    cursor: pointer;
  }

  input:checked {
    #LeftMenu {
      position: relative;
      transform: translateX(0);
    }
  }

  input:checked ~ span {
    background: none;

    :after {
      top: 0;
      transform: rotate(45deg);
    }
    :before {
      bottom: 0;
      transform: rotate(-45deg);
    }
  }

  span {
    width: 25px;
    height: 2px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.text};
    /* margin-bottom: 4px; */
    position: relative;

    transition: all 0.2s ease-in-out;

    :after,
    :before {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      transition: top 0.1s ease-in-out, bottom 0.1s ease-in-out,
        transform 0.1s ease-in-out;
      transition-delay: 0s, 0s, 0.1s;
      background-color: ${({ theme }) => theme.colors.text};
    }

    :after {
      top: -10px;
    }
    :before {
      bottom: -10px;
    }
  }
`
