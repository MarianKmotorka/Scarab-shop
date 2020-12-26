import { useTranslation } from 'react-i18next'
import { Container } from '../../components/Container'
import { PageTitle } from '../../components/PageTitle'
import { useAuthorizedUser } from '../../contextProviders/AuthProvider'
import { Row } from './Profile.styled'

const Profile = () => {
  const { currentUser } = useAuthorizedUser()
  const {t} = useTranslation()

  return (
    <Container>
      <PageTitle>{t('scarabeus.profil')}</PageTitle>

      <Row>
        <label>{t('scarabeus.name')}:</label>
        <p>{currentUser.name}</p>
      </Row>

      <Row>
        <label>{t('scarabeus.email')}:</label>
        <p>{currentUser.email}</p>
      </Row>

      <Row>
        <label>{t('scarabeus.registered')}:</label>
        <p>{currentUser.registered.toDate().toLocaleString()}</p>
      </Row>

      {currentUser.isAdmin && (
        <Row>
          <label>ADMIN:</label>
          <p>{t('scarabeus.yes')}</p>
        </Row>
      )}
    </Container>
  )
}

export default Profile
