import { createContext, FC, useCallback, useContext, useState } from 'react'
import firebase from 'firebase/app'

export type SetError = (err: firebase.firestore.FirestoreError) => void

interface IApiErrorContextValue {
  setError: SetError
  removeError: () => void
  error?: firebase.firestore.FirestoreError
}

const ApiErrorContext = createContext<IApiErrorContextValue>(null!)
export const useApiError = () => useContext(ApiErrorContext)

const ApiErrorProvider: FC = ({ children }) => {
  const [error, setError] = useState<IApiErrorContextValue['error']>()

  const value: IApiErrorContextValue = {
    error,
    removeError: () => setError(undefined),
    setError: useCallback(error => setError(error), []),
  }

  return <ApiErrorContext.Provider value={value}>{children}</ApiErrorContext.Provider>
}

export default ApiErrorProvider
