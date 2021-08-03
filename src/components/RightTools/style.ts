import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  height: 100%;
  width: 100%;

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.xl}) {
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

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.xl}) {
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

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.xl}) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 0px;

    > button {
      margin-right: 40px;
    }
  }

  @media screen and (min-width: ${({ theme: { breakpoints } }) =>
      breakpoints.xl}) {
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

  width: 36px;
  height: 35px;

  background: ${({ theme }) => theme.colors.backgroundDiv};
  border-radius: 5px;

  border: none;
  outline: none;

  cursor: pointer;

  transition: filter 0.4s ease-in-out, transform 0.2s ease-in-out;

  :hover {
    filter: brightness(0.8);
    transform: translateY(-1px);
  }

  :focus {
    border: 1px solid ${({ theme }) => theme.colors.text};
  }

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.xl}) {
    width: 48px;
    height: 48px;
  }

  path {
    transition: stroke 0.4s ease-in-out;
    stroke: ${({ theme }) => theme.colors.text};
  }

  :nth-of-type(2) {
    margin-top: ${({ theme }) => theme.spacing.xsmall};

    @media screen and (max-width: ${({ theme: { breakpoints } }) =>
        breakpoints.xl}) {
      margin-top: 0px;
    }
  }

  :last-of-type {
    margin-bottom: 23px;

    @media screen and (max-width: ${({ theme: { breakpoints } }) =>
        breakpoints.xl}) {
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

    :focus-visible {
      outline: -webkit-focus-ring-color auto 1px;
    }
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
    position: relative;

    transition: background 0.2s ease-in-out;

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
