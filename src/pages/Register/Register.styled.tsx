import styled from 'styled-components'
import { SM } from '../../utils/theme'
import { NAVBAR_HEIGHT_STRING } from '../../components/Navbar/Navbar.styled'

export const Wrapper = styled.div`
  display: grid;
  place-items: center;
  height: calc(100vh - ${NAVBAR_HEIGHT_STRING});
  position: relative;
  background: black;

  form {
    padding: 30px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    max-width: 500px;
    width: 100%;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.9);
    margin: 0 auto;

    > * + * {
      margin-top: 10px;
    }

    button {
      margin-left: auto;
      margin-top: 30px;
      display: block;
      text-transform: uppercase;
      background: transparent;
    }

    @media screen and (max-width: ${SM}px) {
      box-shadow: none;
      padding: 0;
      background: transparent;
    }
  }

  > div {
    z-index: 2;
  }
`

export const FormTitle = styled.h1`
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.primary};
`

export const Bg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  filter: grayscale(100%) opacity(90%);
`
