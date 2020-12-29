import styled from 'styled-components'
import { SM } from '../../utils/theme'
import { NAVBAR_HEIGHT_STRING } from '../../components/Navbar/Navbar.styled'

export const Wrapper = styled.div`
  display: grid;
  place-items: center;
  height: calc(100vh - ${NAVBAR_HEIGHT_STRING});

  form {
    padding: 30px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    max-width: 500px;
    width: 100%;

    > * + * {
      margin-top: 10px;
    }

    button {
      margin-left: auto;
      margin-top: 30px;
      display: block;
      text-transform: uppercase;
    }

    @media screen and (max-width: ${SM}px) {
      box-shadow: none;
      padding: 0;
    }
  }
`

export const FormTitle = styled.h1`
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 30px;
`
