import React, { createContext, useState, useEffect, useContext, useCallback } from 'react'
import firebase from 'firebase/app'

import { IUser } from '../domain'
import { useFirestoreDoc } from '../hooks'
import { propertyOf } from '../utils/utils'
import ErrorPage from '../pages/ErrorPage'
import Loader from '../components/Loader/Loader'
import { getTimestamp, projectAuth, projectFirestore as db } from '../firebase/config'

type AuthContextValue =
  | { isLoggedIn: false; projectAuth: firebase.auth.Auth }
  | {
      isLoggedIn: true
      authUser: firebase.User
      currentUser: IUser
      projectAuth: firebase.auth.Auth
    }

const AuthContext = createContext<AuthContextValue>(undefined!)

export const useAuth = () => useContext(AuthContext)

export const useAuthorizedUser = () => {
  const auth = useAuth()

  if (!auth.isLoggedIn)
    throw new Error('You cannot use this hook where user is not logged in.')

  return auth
}

const AuthProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<AuthContextValue>({ isLoggedIn: false, projectAuth })
  const [authUser, setAuthUser] = useState<firebase.User>()
  const [showLoader, setShowLoader] = useState(true)

  const [userResponse] = useFirestoreDoc<IUser>(
    useCallback(x => x.doc(`users/${authUser!.uid}`), [authUser]),
    { startFetching: !!authUser }
  )

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(async user => {
      if (user) {
        await db
          .doc(`users/${user.uid}`)
          .update({ [propertyOf<IUser>('lastLogin')]: getTimestamp() })

        setAuthUser(user) // Note: this line needs to be bellow updating lastLogin
      } else {
        setState(x => ({ ...x, isLoggedIn: false }))
        setShowLoader(false)
      }
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    if (userResponse.loading || userResponse.error || !authUser) return
    setState(x => ({ ...x, authUser, currentUser: userResponse.data, isLoggedIn: true }))
    setShowLoader(false)
  }, [userResponse, authUser])

  if (!userResponse.loading && userResponse.error)
    return <ErrorPage error={userResponse.error} />

  if (showLoader) return <Loader />

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export default AuthProvider
