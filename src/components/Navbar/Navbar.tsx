import { useState } from 'react'
import { RiAdminFill } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'
import { AnimatePresence } from 'framer-motion'
import { FiMenu, FiPackage } from 'react-icons/fi'
import { useHistory, useLocation } from 'react-router-dom'
import { FaBug, FaShoppingCart, FaTimes } from 'react-icons/fa'

import Badge from '../Badge'
import Button from '../Button/Button'
import { Container } from '../Container'
import { LG, MD } from '../../utils/theme'
import { useWindowSize } from '../../hooks'
import { useNavbarStyles } from './useNavbarStyles'
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
  const location = useLocation()
  const { t } = useTranslation()
  const { width } = useWindowSize()
  const [isOpen, setIsOpen] = useState(false)

  const isLandingPage = location.pathname === '/'
  const isLessThanMD = width <= MD
  const isLessThanLG = width <= LG
  const isAdmin = auth.isLoggedIn && auth.currentUser.isAdmin

  const [viewHeightScrolled] = useNavbarStyles(!isLandingPage)

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
      {isAdmin && (
        <StyledLink to='/admin' onClick={() => close()}>
          <RiAdminFill />
          <p>Admin</p>
        </StyledLink>
      )}

      {auth.isLoggedIn && !isAdmin && (
        <StyledLink to='/orders' onClick={() => close()}>
          <FiPackage />
          <p>{t('scarabeus.orders')}</p>
        </StyledLink>
      )}

      <StyledLink to='/products' onClick={() => close()}>
        <FaBug />
        <p>{t('scarabeus.products')}</p>
      </StyledLink>

      <StyledLink to='/cart' onClick={() => close()}>
        <Center>
          <Badge value={count}>
            <FaShoppingCart />
          </Badge>
        </Center>

        <p>{t('scarabeus.cart')}</p>
      </StyledLink>
    </ProductLinks>
  )

  return (
    <Wrapper isLandingPage={isLandingPage} transparent={!viewHeightScrolled && !isOpen}>
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
