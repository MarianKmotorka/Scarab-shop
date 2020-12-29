import moment from 'moment'
import { useCallback } from 'react'
import { BsClock as PendingIcon, BsCheck as ResolvedIcon } from 'react-icons/bs'
import { Container } from '../../../components/Container'
import Loader from '../../../components/Loader/Loader'
import { PageMinHeightWrapper } from '../../../components/PageMinHeightWrapper'
import { PageTitle } from '../../../components/PageTitle'
import { IOrder } from '../../../domain'
import { useFirestoreQuery } from '../../../hooks'
import { propertyOf } from '../../../utils/utils'
import ErrorPage from '../../ErrorPage'
import { NewBadge, OrderLink } from './Orders.styled'

const Orders = () => {
  const [orders, loading, error] = useFirestoreQuery<IOrder>(
    useCallback(
      db => db.collection('orders').orderBy(propertyOf<IOrder>('placed'), 'desc'),
      []
    )
  )

  if (error) return <ErrorPage error={error} />

  return (
    <PageMinHeightWrapper>
      <PageTitle>Orders</PageTitle>

      <Container>
        {loading && <Loader />}

        {orders.map(o => (
          <OrderLink key={o.id} to={`/admin/orders/${o.id}`} isNew={o.isNew}>
            <p>{moment(o.placed.toDate()).format('MMMM Do YYYY')}</p>
            {o.isNew && <NewBadge>NEW</NewBadge>}
            {o.resolved ? <ResolvedIcon /> : <PendingIcon />}
          </OrderLink>
        ))}
      </Container>
    </PageMinHeightWrapper>
  )
}

export default Orders
