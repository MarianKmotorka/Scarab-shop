import { useTranslation } from 'react-i18next'
import { AiFillInstagram } from 'react-icons/ai'
import { LOCAL_STORAGE_LANGUAGE_KEY } from '../../i18n/i18nSetup'
import { Container } from '../Container'
import { InstaLink, Content, LangButton, Wrapper, PoliciesLink } from './Footer.styled'

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
          <PoliciesLink href='#'>{t('scarabeus.policies')}</PoliciesLink>

          <InstaLink href='https://www.instagram.com/platyc333rcus/'>
            <AiFillInstagram />
          </InstaLink>

          <LangButton selected={i18n.language === 'en'} onClick={() => setLanguage('en')}>
            EN
          </LangButton>
          <LangButton selected={i18n.language === 'sk'} onClick={() => setLanguage('sk')}>
            SK
          </LangButton>
        </Content>
      </Container>
    </Wrapper>
  )
}

export default Footer
