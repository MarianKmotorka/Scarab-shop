import { useTranslation } from 'react-i18next'
import { LOCAL_STORAGE_LANGUAGE_KEY } from '../../i18n/i18nSetup'
import { Container } from '../Container'
import { LangButtonContainer, StyledButton, Wrapper } from './Footer.styled'

const Footer = () => {
  const { i18n } = useTranslation()

  const setLanguage = (lang: string) => {
    localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, lang)
    i18n.changeLanguage(lang)
  }

  return (
    <Wrapper>
      <Container>
        <LangButtonContainer>
          <StyledButton
            selected={i18n.language === 'en'}
            onClick={() => setLanguage('en')}
          >
            EN
          </StyledButton>
          <StyledButton
            selected={i18n.language === 'sk'}
            onClick={() => setLanguage('sk')}
          >
            SK
          </StyledButton>
        </LangButtonContainer>
      </Container>
    </Wrapper>
  )
}

export default Footer
