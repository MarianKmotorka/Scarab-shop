import { IOrder } from '../domain'
import { SetError } from '../contextProviders/ApiErrorProvider'
import { getTimestamp, projectFirestore } from '../firebase/config'

export const createOrder = async (
  order: Omit<IOrder, 'id' | 'placed'>,
  setError: SetError
) => {
  const data: Omit<IOrder, 'id'> = {
    ...order,
    placed: getTimestamp(),
  }

  await projectFirestore.collection('orders').add(data).catch(setError)
}
