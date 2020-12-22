import { Container } from '../../components/Container'
import butterfly from '../../images/framed-butterfly.jpg'
import beetle from '../../images/framed-beetle.jpg'
import { Image, LinksContainer, LinkText, StyledLink, Wrapper } from './Home.styled'

const Home = () => {
  return (
    <Wrapper>
      <Container>
        <LinksContainer>
          <StyledLink to='/butterflies'>
            <LinkText>Motýle</LinkText>
            <Image src={butterfly} />
          </StyledLink>

          <StyledLink to='/bugs'>
            <LinkText>Chrobáky</LinkText>
            <Image src={beetle} />
          </StyledLink>
        </LinksContainer>
      </Container>
    </Wrapper>
  )
}

export default Home
