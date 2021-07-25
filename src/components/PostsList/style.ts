import styled from 'styled-components'

export const Container = styled.div`
  margin-left: 112px;
  margin-top: ${({ theme }) => theme.spacing.xxlarge};
  /* width: 100%; */
  /* height: 100%; */

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.xl}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 0px;
  }

  a {
    text-decoration: none;
    outline: none;
    display: flex;
    width: auto;
    /* min-height: 143px; */
    width: 95%;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 64px;

    :focus-visible {
      outline: -webkit-focus-ring-color auto 1px;
    }
  }
`
