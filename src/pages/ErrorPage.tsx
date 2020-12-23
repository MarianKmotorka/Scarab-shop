import firebase from 'firebase/app'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { NAVBAR_HEIGHT_STRING } from '../components/Navbar/Navbar.styled'

interface IErrorPageProps {
  error: firebase.firestore.FirestoreError
}

const Wrapper = styled.div`
  height: calc(100% - ${NAVBAR_HEIGHT_STRING});
  display: grid;
  place-items: center;

  * + * {
    margin-top: 15px;
  }

  > div {
    width: 80%;
    padding: 50px;
    box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.2), 0 0 50px rgba(0, 0, 0, 0.2);
  }
`

const ErrorPage = ({ error }: IErrorPageProps) => {
  if (error.code === 'not-found') return <Redirect to='/not-found' />

  return (
    <Wrapper>
      <div>
        <h1>{error.name}</h1>
        <p>{error.message}</p>
        <p>Developer info:</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    </Wrapper>
  )
}

export default ErrorPage
