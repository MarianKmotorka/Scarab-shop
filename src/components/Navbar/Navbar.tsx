import { useState } from 'react'
import { RiAdminFill } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'
import { FiPackage } from 'react-icons/fi'
import { useHistory, useLocation } from 'react-router-dom'

import Button from '../Button/Button'
import { Container } from '../Container'
import { LG } from '../../utils/theme'
import { useWindowSize } from '../../hooks'
import { useNavbarStyles } from './useNavbarStyles'
import { useAuth } from '../../contextProviders/AuthProvider'

import {
  Logo,
  Wrapper,
  StyledLink,
  AuthLinksContainer,
  ProductLinks,
  UserName,
} from './Navbar.styled'

const Navbar = () => {
  const auth = useAuth()
  const history = useHistory()
  const location = useLocation()
  const { t } = useTranslation()
  const { width } = useWindowSize()
  const [isOpen, setIsOpen] = useState(false)

  const isLandingPage = location.pathname === '/'
  const isLessThanLG = width <= LG
  const isAdmin = auth.isLoggedIn && auth.currentUser.isAdmin

  const [viewHeightScrolled] = useNavbarStyles(!isLandingPage)

  const close = (callback?: () => void) => {
    setIsOpen(false)
    callback && callback()
  }

  const authLinks = auth.isLoggedIn && (
    <AuthLinksContainer>
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
    </AuthLinksContainer>
  )

  const productLinks = (
    <ProductLinks>
      {isAdmin && (
        <StyledLink to='/admin' onClick={() => close()}>
          <RiAdminFill />
        </StyledLink>
      )}

      {auth.isLoggedIn && !isAdmin && (
        <StyledLink to='/orders' onClick={() => close()}>
          <FiPackage />
          <p>{t('scarabeus.orders')}</p>
        </StyledLink>
      )}

      <StyledLink to='/products' onClick={() => close()}>
        <p>{t('scarabeus.products')}</p>
      </StyledLink>
    </ProductLinks>
  )

  return (
    <Wrapper isLandingPage={isLandingPage} transparent={!viewHeightScrolled && !isOpen}>
      <Container>
        <Logo onClick={() => history.push('/')}>scarabeus</Logo>

        {productLinks}
        {!isLessThanLG && authLinks}
      </Container>
    </Wrapper>
  )
}

export default Navbar
