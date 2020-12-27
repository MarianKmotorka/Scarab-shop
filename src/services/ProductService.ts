import omit from 'lodash/omit'
import { SetError } from '../contextProviders/ApiErrorProvider'
import { IProduct } from '../domain'
import { projectFirestore } from '../firebase/config'

export const createProduct = async (
  product: Omit<IProduct, 'id'>,
  setError: SetError
) => {
  const doc = await projectFirestore.collection('/products').add(product).catch(setError)
  return doc ? doc.id : null
}

export const editProduct = async (product: IProduct, setError: SetError) => {
  const data = omit(product, 'id')
  await projectFirestore.doc(`/products/${product.id}`).update(data).catch(setError)
}
