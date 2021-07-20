import styled from 'styled-components'

export const Container = styled.div`
  margin-left: 112px;
  margin-top: 56px;
  /* width: 100%; */
  /* height: 100%; */

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.xl}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 0px;
  }
`
