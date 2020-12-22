import styled from 'styled-components'
import { SM, MD } from '../utils/theme'

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 80%;

  @media screen and (max-width: ${MD}px) {
    max-width: 90%;
  }

  @media screen and (max-width: ${SM}px) {
    max-width: 100%;
  }
`
