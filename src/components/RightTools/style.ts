import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  height: 100%;
  width: 100%;
`

export const TopButtonsWrapper = styled.div`
  margin-top: 23px;
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

  path {
    stroke: ${({ theme }) => theme.colors.text};
  }

  :nth-of-type(2) {
    margin-top: 16px;
  }

  :last-of-type {
    margin-bottom: 40px;
  }
`
