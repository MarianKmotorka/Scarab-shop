import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GiButterfly } from 'react-icons/gi'
import { FiMenu } from 'react-icons/fi'
import { FaBug, FaShoppingCart, FaTimes } from 'react-icons/fa'

import { MD } from '../../utils/theme'
import { Container } from '../Container'
import { useWindowSize } from '../../hooks'

import {
  ResponsiveMenuLinks,
  Logo,
  Wrapper,
  StyledLink,
  MenuButton,
} from './Navbar.styled'
import { AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const history = useHistory()
  const { width } = useWindowSize()
  const [isOpen, setIsOpen] = useState(false)

  const isSmallScreen = width <= MD
  const showMenu = (isSmallScreen && isOpen) || !isSmallScreen

  return (
    <Wrapper>
      <Container>
        <Logo onClick={() => history.push('/')}>scarabeus</Logo>

        <AnimatePresence>
          {showMenu && (
            <ResponsiveMenuLinks
              initial={{ right: -400 }}
              animate={{ right: 0 }}
              exit={{ right: -400 }}
              transition={{ type: 'spring', mass: 0.1 }}
            >
              <StyledLink to='/butterflies'>
                <GiButterfly />
                <p>Motýle</p>
              </StyledLink>

              <StyledLink to='/bugs'>
                <FaBug />
                <p>Chrobáky</p>
              </StyledLink>

              <StyledLink to='/cart'>
                <FaShoppingCart />
                <p>Košík</p>
              </StyledLink>
            </ResponsiveMenuLinks>
          )}
        </AnimatePresence>

        {isSmallScreen && (
          <MenuButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FiMenu />}
          </MenuButton>
        )}
      </Container>
    </Wrapper>
  )
}

export default Navbar
