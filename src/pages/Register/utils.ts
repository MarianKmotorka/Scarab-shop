import firebase from 'firebase/app'
import { ISubmitError } from '../../components/HookForm/HookForm'
import { IRegisterFormData } from './Register'

export const firebaseErrorToFieldError = ({
  code,
}: firebase.FirebaseError): ISubmitError<IRegisterFormData> => {
  switch (code) {
    case 'auth/email-already-in-use':
      return { field: 'email', error: 'Email sa už používa.' }

    case 'auth/weak-password':
      return { field: 'password', error: 'Slabé heslo.' }

    case 'auth/invalid-email':
      return { field: 'email', error: 'Neplatný email.' }

    default:
      return { field: 'email', error: code }
  }
}
