import { useEffect } from 'react'
import { IDailyVisitors } from '../../domain'
import { propertyOf } from '../../utils/utils'
import { FieldValue, projectFirestore } from '../../firebase/config'
import { useUserIpAddress } from '../../contextProviders/UserIpAddressProvider'

export const useDailyVisitors = () => {
  const { ip } = useUserIpAddress()

  useEffect(() => {
    if (!ip) return

    const date = new Date()
    const docId = `${date.getDay()}_${date.getMonth()}_${date.getFullYear()}`

    projectFirestore
      .doc(`/dailyVisitors/${docId}`)
      .set(
        { [propertyOf<IDailyVisitors>('visitorIps')]: FieldValue.arrayUnion(ip) },
        { merge: true }
      )
      .catch(err => console.log('useDaVi ERROR: ', err.code))
  }, [ip])
}
