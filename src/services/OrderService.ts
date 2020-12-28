import { IOrder, IUserOrder } from '../domain'
import { SetError } from '../contextProviders/ApiErrorProvider'
import { getTimestamp, projectFirestore } from '../firebase/config'

export const createOrder = async (
  order: Omit<IOrder, 'id' | 'placed'>,
  setError: SetError
) => {
  const orderData: Omit<IOrder, 'id'> = {
    ...order,
    placed: getTimestamp(),
  }

  const userOrderData: Omit<IUserOrder, 'id'> = {
    customerEmail: orderData.customerEmail,
    cutomerName: orderData.cutomerName,
    customerMessage: orderData.customerMessage,
    placed: orderData.placed,
    products: orderData.products,
  }

  const response = await projectFirestore
    .collection('orders')
    .add(orderData)
    .catch(setError)

  if (orderData.userId && response)
    await projectFirestore
      .doc(`users/${orderData.userId}/ordersHistory/${response.id}`)
      .set(userOrderData)
      .catch(setError)
}
