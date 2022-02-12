import styled from 'styled-components'
import { MD } from '../utils/theme'

export const PageTitle = styled.h1`
  width: 100%;
  padding: 40px 10%;

  @media screen and (max-width: ${MD}px) {
    padding: 20px 5%;
    font-size: 1.5rem;
  }

  font-size: 1.8rem;
  font-weight: 500;
`
