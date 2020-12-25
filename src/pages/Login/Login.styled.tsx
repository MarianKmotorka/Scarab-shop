import styled from 'styled-components'
import { NAVBAR_HEIGHT_STRING } from '../../components/Navbar/Navbar.styled'

export const Wrapper = styled.div`
  display: grid;
  place-items: center;
  height: calc(100vh - ${NAVBAR_HEIGHT_STRING});

  form {
    padding: 30px;
    box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.2), 0 0 50px rgba(0, 0, 0, 0.3);
    max-width: 500px;
    width: 100%;
    background: ${({ theme }) => theme.white2};

    > * + * {
      margin-top: 10px;
    }

    button {
      margin-left: auto;
      margin-top: 30px;
      display: block;
    }
  }
`

export const FormTitle = styled.h1`
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 40px;
`
