import firebase from 'firebase/app'
import { ISubmitError } from '../../components/HookForm/HookForm'
import { ILoginFormData } from './Login'

export const firebaseErrorToFieldError = ({
  code,
}: firebase.FirebaseError): ISubmitError<ILoginFormData> => {
  switch (code) {
    case 'auth/wrong-password':
      return { field: 'password', error: 'scarabeus.validation.wrongPassword' }

    case 'auth/user-not-found':
      return { field: 'email', error: 'scarabeus.validation.userNotFound' }

    case 'auth/invalid-email':
      return { field: 'email', error: 'scarabeus.validation.invalidEmail' }

    default:
      return { field: 'email', error: code }
  }
}
