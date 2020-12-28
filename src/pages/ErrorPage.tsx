import firebase from 'firebase/app'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import { NAVBAR_HEIGHT_STRING } from '../components/Navbar/Navbar.styled'

interface IErrorPageProps {
  error: firebase.firestore.FirestoreError | firebase.storage.FirebaseStorageError
  removeError?: () => void
}

const Wrapper = styled.div`
  height: calc(100% - ${NAVBAR_HEIGHT_STRING});
  display: grid;
  place-items: center;

  * + * {
    margin-top: 15px;
  }
`

const Card = styled.div`
  width: 80%;
  padding: 50px;
  position: relative;
  box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.2), 0 0 50px rgba(0, 0, 0, 0.2);

  svg {
    top: 10px;
    right: 10px;
    margin: 0;
    cursor: pointer;
    font-size: 1.5rem;
    position: absolute;
  }
`

const ErrorPage = ({ error, removeError }: IErrorPageProps) => {
  if (error.code === 'not-found') return <Redirect to='/not-found' />

  return (
    <Wrapper>
      <Card>
        <h1>{error.name}</h1>
        <p>{error.message}</p>
        <p>Developer info:</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>

        {removeError && <FaTimes onClick={removeError} />}
      </Card>
    </Wrapper>
  )
}

export default ErrorPage
