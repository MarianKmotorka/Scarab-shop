import { useEffect } from 'react'
import moment from 'moment'
import { IDailyVisitors } from '../../domain'
import { propertyOf } from '../../utils/utils'
import { FieldValue, projectFirestore } from '../../firebase/config'
import { useUserIpAddress } from '../../contextProviders/UserIpAddressProvider'

export const useDailyVisitors = () => {
  const { ip } = useUserIpAddress()

  useEffect(() => {
    if (!ip) return

    const docId = moment(new Date()).format('DD_MM_YYYY')

    projectFirestore
      .doc(`/dailyVisitors/${docId}`)
      .set(
        { [propertyOf<IDailyVisitors>('visitorIps')]: FieldValue.arrayUnion(ip) },
        { merge: true }
      )
      .catch(err => console.log('useDaVi ERROR: ', err.code))
  }, [ip])
}
