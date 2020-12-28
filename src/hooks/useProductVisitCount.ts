import { useEffect } from 'react'
import { propertyOf } from '../utils/utils'
import { Data } from '../hooks/useFirestoreDoc'
import { IEntity, IProductStatistics } from '../domain'
import { FieldValue, projectFirestore } from '../firebase/config'
import { useUserIpAddress } from '../contextProviders/UserIpAddressProvider'

const VIEWED_PRODUCT_IDS_LOCAL_STORAGE_KEY = 'scarabeus.viewed_product_ids'

const useProductVisitCount = (productResponse: Data<IEntity>) => {
  const { ip } = useUserIpAddress()

  useEffect(() => {
    const updateProductStats = async () => {
      if (!ip || productResponse.loading || productResponse.error) return

      const productId = productResponse.data.id
      let viewedProductIds: string[] = []

      try {
        viewedProductIds = JSON.parse(
          localStorage.getItem(VIEWED_PRODUCT_IDS_LOCAL_STORAGE_KEY) || '[]'
        )
      } catch (err) {
        // pass
      }

      if (viewedProductIds.includes(productId)) return

      try {
        await projectFirestore.doc(`productStatistics/${productId}`).set(
          {
            [propertyOf<IProductStatistics>('viewedByIps')]: FieldValue.arrayUnion(ip),
          },
          { merge: true }
        )

        localStorage.setItem(
          VIEWED_PRODUCT_IDS_LOCAL_STORAGE_KEY,
          JSON.stringify([...viewedProductIds, productId])
        )
      } catch (err) {
        console.log('usePrViCo: ', err.code)
      }
    }

    updateProductStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ip, productResponse.loading])
}

export default useProductVisitCount
