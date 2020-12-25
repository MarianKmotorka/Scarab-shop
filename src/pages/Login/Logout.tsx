import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
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

  return <p>Logging out</p>
}

export default Logout
