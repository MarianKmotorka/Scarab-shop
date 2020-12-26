import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Container } from '../../components/Container'
import { PageMinHeightWrapper } from '../../components/PageMinHeightWrapper'
import { projectAuth } from '../../firebase/config'

const Logout = () => {
  const history = useHistory()

  useEffect(() => {
    const signout = async () => {
      await projectAuth.signOut()
      history.replace('/login')
    }

    signout()
  }, [history])

  return (
    <PageMinHeightWrapper>
      <Container>Logging out</Container>
    </PageMinHeightWrapper>
  )
}

export default Logout
