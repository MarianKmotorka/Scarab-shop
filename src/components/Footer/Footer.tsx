import { useTranslation } from 'react-i18next'
import { AiFillInstagram } from 'react-icons/ai'

import { Container } from '../Container'
import { LOCAL_STORAGE_LANGUAGE_KEY } from '../../i18n/i18nSetup'

import {
  InstaLink,
  Content,
  LangButton,
  Wrapper,
  StyledAnchor,
  LangButtonsContainer,
} from './Footer.styled'

const privacyPolicy =
  'https://firebasestorage.googleapis.com/v0/b/makm-scarabeus-prod.appspot.com/o/Privacy-Policy-for-scarabeus.pdf?alt=media&token=6be4fd07-c256-48fc-a7f5-42f768dec9b8'

const Footer = () => {
  const { i18n, t } = useTranslation()

  const setLanguage = (lang: string) => {
    localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, lang)
    i18n.changeLanguage(lang)
  }

  return (
    <Wrapper>
      <Container>
        <Content>
          <StyledAnchor href={privacyPolicy}>{t('scarabeus.policies')}</StyledAnchor>

          <StyledAnchor href='mailto: scarabeus.team@gmail.com'>
            {t('scarabeus.contactUs')}
          </StyledAnchor>

          <InstaLink href='https://www.instagram.com/the.scarabeus/' target='blank'>
            <AiFillInstagram />
          </InstaLink>

          <LangButtonsContainer>
            <LangButton
              selected={i18n.language === 'en'}
              onClick={() => setLanguage('en')}
            >
              EN
            </LangButton>
            <LangButton
              selected={i18n.language === 'sk'}
              onClick={() => setLanguage('sk')}
            >
              SK
            </LangButton>
          </LangButtonsContainer>
        </Content>
      </Container>
    </Wrapper>
  )
}

export default Footer
