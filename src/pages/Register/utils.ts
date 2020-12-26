import firebase from 'firebase/app'
import { ISubmitError } from '../../components/HookForm/HookForm'
import { IRegisterFormData } from './Register'

export const firebaseErrorToFieldError = ({
  code,
}: firebase.FirebaseError): ISubmitError<IRegisterFormData> => {
  switch (code) {
    case 'auth/email-already-in-use':
      return { field: 'email', error: 'scarabeus.validation.emailAlreadyInUser' }

    case 'auth/weak-password':
      return { field: 'password', error: 'scarabeus.validation.weakPassword' }

    case 'auth/invalid-email':
      return { field: 'email', error: 'scarabeus.validation.invalidEmail' }

    default:
      return { field: 'email', error: code }
  }
}
