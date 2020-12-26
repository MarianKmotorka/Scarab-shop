import { useTranslation } from 'react-i18next'
import { Container } from '../Container'
import { LangButtonContainer, StyledButton, Wrapper } from './Footer.styled'

const Footer = () => {
  const { i18n } = useTranslation()

  return (
    <Wrapper>
      <Container>
        <LangButtonContainer>
          <StyledButton
            selected={i18n.language === 'en'}
            onClick={() => i18n.changeLanguage('en')}
          >
            EN
          </StyledButton>
          <StyledButton
            selected={i18n.language === 'sk'}
            onClick={() => i18n.changeLanguage('sk')}
          >
            SK
          </StyledButton>
        </LangButtonContainer>
      </Container>
    </Wrapper>
  )
}

export default Footer
