import { SetError } from '../contextProviders/ApiErrorProvider'
import { IUser } from '../domain'
import { getTimestamp, projectFirestore } from '../firebase/config'

export const createUser = async (
  newUser: Pick<IUser, 'email' | 'name' | 'id'>,
  setError: SetError
) => {
  const data: Omit<IUser, 'id'> = {
    name: newUser.name,
    email: newUser.email,
    lastLogin: getTimestamp(),
    registered: getTimestamp(),
    isAdmin: false,
  }

  return await projectFirestore
    .collection('users')
    .doc(newUser.id)
    .set(data)
    .catch(setError)
}
