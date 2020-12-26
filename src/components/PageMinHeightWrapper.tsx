import styled, { css } from 'styled-components'
import { NAVBAR_HEIGHT_STRING } from './Navbar/Navbar.styled'

export const PageMinHeightWrapper = styled.div<{ center?: boolean }>`
  min-height: calc(100vh - ${NAVBAR_HEIGHT_STRING});
  ${({ center }) =>
    center &&
    css`
      display: grid;
      place-items: center;
    `}
`
