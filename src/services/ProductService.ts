import omit from 'lodash/omit'
import { IProduct } from '../domain'
import { SetError } from '../contextProviders/ApiErrorProvider'
import { projectFirestore, projectStorage } from '../firebase/config'

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

export const deleteProduct = async (product: IProduct, setError: SetError) => {
  try {
    const promises = product.imageUrls.map(url => projectStorage.refFromURL(url).delete())
    await Promise.all(promises)
    await deleteImagesFromStorage(product.imageUrls)
  } catch (err) {
    // Pass for now
    console.log('DELETE image error: ', JSON.stringify(err, null, 2))
  }

  await projectFirestore.doc(`/products/${product.id}`).delete().catch(setError)
}

export const deleteImagesFromStorage = async (urls: string[]) => {
  const promises = urls.map(x => projectStorage.refFromURL(x).delete())

  try {
    await Promise.all(promises)
  } catch (err) {
    // Pass
  }
}
