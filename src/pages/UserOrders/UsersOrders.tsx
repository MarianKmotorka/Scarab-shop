import { useCallback } from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

import ErrorPage from '../ErrorPage'
import { IUserOrder } from '../../domain'
import { useFirestoreQuery } from '../../hooks'
import { propertyOf } from '../../utils/utils'
import Loader from '../../components/Loader/Loader'
import { Container } from '../../components/Container'
import { PageTitle } from '../../components/PageTitle'
import { useAuthorizedUser } from '../../contextProviders/AuthProvider'
import { PageMinHeightWrapper } from '../../components/PageMinHeightWrapper'

import { OrderLink } from './UserOrders.styled'

const UserOrders = () => {
  const { t, i18n } = useTranslation()
  const { currentUser } = useAuthorizedUser()
  const [orders, loading, error] = useFirestoreQuery<IUserOrder>(
    useCallback(
      db =>
        db
          .collection(`users/${currentUser.id}/ordersHistory`)
          .orderBy(propertyOf<IUserOrder>('placed'), 'desc'),
      [currentUser.id]
    )
  )

  if (error) return <ErrorPage error={error} />

  return (
    <PageMinHeightWrapper>
      <PageTitle>{t('scarabeus.myOrdersHistory')}</PageTitle>

      <Container>
        {loading && <Loader />}

        {orders.map(o => (
          <OrderLink key={o.id} to={`/orders/${o.id}`}>
            <p>
              {moment(o.placed.toDate()).format(
                i18n.language === 'sk' ? 'DD.MM. YYYY' : 'MMMM Do YYYY'
              )}
            </p>
          </OrderLink>
        ))}
      </Container>
    </PageMinHeightWrapper>
  )
}

export default UserOrders
