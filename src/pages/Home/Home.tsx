import { useTranslation } from 'react-i18next'

import { Container } from '../../components/Container'
import butterfly from '../../images/framed-butterfly.jpg'
import beetle from '../../images/framed-beetle.jpg'

import { Image, LinksContainer, LinkText, StyledLink, Wrapper } from './Home.styled'

const Home = () => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <Container>
        <LinksContainer>
          <StyledLink to='/butterflies'>
            <LinkText>{t('scarabeus.butterflies')}</LinkText>
            <Image src={butterfly} />
          </StyledLink>

          <StyledLink to='/bugs'>
            <LinkText>{t('scarabeus.beetles')}</LinkText>
            <Image src={beetle} />
          </StyledLink>
        </LinksContainer>
      </Container>
    </Wrapper>
  )
}

export default Home
