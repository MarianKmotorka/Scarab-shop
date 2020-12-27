import styled from 'styled-components'
import { PageMinHeightWrapper } from '../../../components/PageMinHeightWrapper'

export const Wrapper = styled(PageMinHeightWrapper)`
  form {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;

    > * + * {
      margin-top: 10px;
    }

    button {
      margin-left: auto;
      margin-top: 20px;
      display: block;
    }
  }
`

export const SectionTitle = styled.h1`
  font-weight: 400;
  font-size: 1.7rem;
  margin: 50px 0;
  border-bottom: solid 1px ${({ theme }) => theme.black};
`

export const Directions = styled.p`
  padding: 25px 30px;
  background-color: ${({ theme }) => theme.white2};
  margin-bottom: 20px;
`
