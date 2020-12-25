import { useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import { GiButterfly } from 'react-icons/gi'
import { useHistory } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { FaBug, FaShoppingCart, FaTimes } from 'react-icons/fa'

import Badge from '../Badge'
import Button from '../Button/Button'
import { Container } from '../Container'
import { LG, MD } from '../../utils/theme'
import { useWindowSize } from '../../hooks'
import { useCart } from '../../contextProviders/CartProvider'

import {
  Menu,
  Logo,
  Wrapper,
  StyledLink,
  MenuButton,
  Center,
  AuthLinksContainer,
  ProductLinks,
  UserName,
} from './Navbar.styled'

const Navbar = () => {
  const history = useHistory()
  const { width } = useWindowSize()
  const [isOpen, setIsOpen] = useState(false)
  const { count } = useCart()

  const isLessThanMD = width <= MD
  const isLessThanLG = width <= LG

  const close = (callback?: () => void) => {
    setIsOpen(false)
    callback && callback()
  }

  const authLinks = (
    <AuthLinksContainer>
      <Button reversed>PRIHLÁS SA</Button>
      <Button colorInverted reversed>
        REGISTRUJ SA
      </Button>

      {/* <UserName to='profile' onClick={() => close()}>
        katarina.magala@gmail.com
      </UserName>
      <Button colorInverted reversed onClick={() => close(() => history.push('/logout'))}>
        ODHLÁS SA
      </Button> */}
    </AuthLinksContainer>
  )

  const productLinks = (
    <ProductLinks>
      <StyledLink to='/butterflies' onClick={() => close()}>
        <GiButterfly />
        <p>Motýle</p>
      </StyledLink>

      <StyledLink to='/bugs' onClick={() => close()}>
        <FaBug />
        <p>Chrobáky</p>
      </StyledLink>

      <StyledLink to='/cart' onClick={() => close()}>
        <Center>
          <Badge value={count}>
            <FaShoppingCart />
          </Badge>
        </Center>

        <p>Košík</p>
      </StyledLink>
    </ProductLinks>
  )

  return (
    <Wrapper>
      <Container>
        <Logo onClick={() => history.push('/')}>scarabeus</Logo>

        {!isLessThanMD && productLinks}
        {!isLessThanLG && authLinks}

        <AnimatePresence>
          {isLessThanLG && isOpen && (
            <Menu
              initial={{ right: -400 }}
              animate={{ right: 0 }}
              exit={{ right: -400 }}
              transition={{ type: 'spring', mass: 0.1 }}
            >
              {isLessThanMD && productLinks}
              {isLessThanLG && authLinks}
            </Menu>
          )}
        </AnimatePresence>

        {isLessThanLG && (
          <MenuButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FiMenu />}
          </MenuButton>
        )}
      </Container>
    </Wrapper>
  )
}

export default Navbar
