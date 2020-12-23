import styled from 'styled-components'
import { NAVBAR_HEIGHT_STRING } from '../components/Navbar/Navbar.styled'

const Wrapper = styled.div`
  height: calc(100% - ${NAVBAR_HEIGHT_STRING});
  display: grid;
  place-items: center;
`

const NotFoundPage = () => (
  <Wrapper>
    <h1>404 | Page Not Found</h1>
  </Wrapper>
)

export default NotFoundPage
