import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { NAVBAR_HEIGHT_STRING } from '../../components/Navbar/Navbar.styled'
import { MD } from '../../utils/theme'

export const Wrapper = styled.div`
  height: calc(100vh - ${NAVBAR_HEIGHT_STRING});

  > div {
    height: 100%;
    display: flex;
    align-items: center;
  }
`

export const LinksContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 20px;
  transition: transform 0.3s;

  :hover {
    transform: scale(1.1);
  }
`

export const LinkText = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.black};
  margin-bottom: 15px;
`

export const Image = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;

  @media screen and (max-width: ${MD}px) {
    width: 200px;
    height: 200px;
  }
`
