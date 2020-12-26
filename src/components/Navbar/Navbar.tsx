import { useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import { GiButterfly } from 'react-icons/gi'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence } from 'framer-motion'
import { FaBug, FaShoppingCart, FaTimes } from 'react-icons/fa'
import { BsFillCaretDownFill } from 'react-icons/bs'

import Badge from '../Badge'
import Button from '../Button/Button'
import { Container } from '../Container'
import { LG, MD } from '../../utils/theme'
import { useWindowSize } from '../../hooks'
import { useCart } from '../../contextProviders/CartProvider'
import { useAuth } from '../../contextProviders/AuthProvider'

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
  LoginButton,
} from './Navbar.styled'

const Navbar = () => {
  const auth = useAuth()
  const { count } = useCart()
  const history = useHistory()
  const { t } = useTranslation()
  const { width } = useWindowSize()
  const [isOpen, setIsOpen] = useState(false)

  const isLessThanMD = width <= MD
  const isLessThanLG = width <= LG

  const close = (callback?: () => void) => {
    setIsOpen(false)
    callback && callback()
  }

  const authLinks = (
    <AuthLinksContainer>
      {!auth.isLoggedIn && (
        <>
          <LoginButton reversed onClick={() => close(() => history.push('/login'))}>
            {t('scarabeus.login')}
          </LoginButton>

          <Button
            colorInverted
            reversed
            onClick={() => close(() => history.push('/register'))}
          >
            {t('scarabeus.register')}
          </Button>
        </>
      )}

      {auth.isLoggedIn && (
        <>
          <UserName to='/profile' onClick={() => close()}>
            {auth.currentUser.email}
          </UserName>
          <Button
            colorInverted
            reversed
            onClick={() => close(() => history.push('/logout'))}
          >
            {t('scarabeus.logout')}
          </Button>
        </>
      )}
    </AuthLinksContainer>
  )

  const productLinks = (
    <ProductLinks>
      <StyledLink to='/butterflies' onClick={() => close()}>
        <GiButterfly />
        {t('scarabeus.butterflies')}
      </StyledLink>

      <StyledLink to='/bugs' onClick={() => close()}>
        <FaBug />
        {t('scarabeus.bugs')}
      </StyledLink>

      <StyledLink to='/cart' onClick={() => close()}>
        <Center>
          <Badge value={count}>
            <FaShoppingCart />
          </Badge>
        </Center>

        {t('scarabeus.cart')}
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
