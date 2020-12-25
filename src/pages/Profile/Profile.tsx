import { Container } from '../../components/Container'
import { PageTitle } from '../../components/PageTitle'
import { useAuthorizedUser } from '../../contextProviders/AuthProvider'
import { Row } from './Profile.styled'

const Profile = () => {
  const { currentUser } = useAuthorizedUser()

  return (
    <Container>
      <PageTitle>Profil</PageTitle>

      <Row>
        <label>Meno:</label>
        <p>{currentUser.name}</p>
      </Row>

      <Row>
        <label>Email:</label>
        <p>{currentUser.email}</p>
      </Row>

      <Row>
        <label>Zaregistovaný:</label>
        <p>{currentUser.registered.toDate().toLocaleString()}</p>
      </Row>

      {currentUser.isAdmin && (
        <Row>
          <label>ADMIN:</label>
          <p>ANO</p>
        </Row>
      )}
    </Container>
  )
}

export default Profile
