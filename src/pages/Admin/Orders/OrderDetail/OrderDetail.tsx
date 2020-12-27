import { useEffect } from 'react'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { BsClock as PendingIcon, BsCheck as ResolvedIcon } from 'react-icons/bs'
import { Container } from '../../../../components/Container'

import ErrorPage from '../../../ErrorPage'
import { IOrder } from '../../../../domain'
import { useFirestoreDoc } from '../../../../hooks'
import { propertyOf } from '../../../../utils/utils'
import { Message, Row, State } from './OrderDetail.styled'
import { PageTitle } from '../../../../components/PageTitle'
import { projectFirestore } from '../../../../firebase/config'
import { FullPageLoader } from '../../../../components/Loader/Loader'
import { PageMinHeightWrapper } from '../../../../components/PageMinHeightWrapper'
import Button from '../../../../components/Button/Button'

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>()
  const [response] = useFirestoreDoc<IOrder>(`/orders/${orderId}`)

  useEffect(() => {
    if (response.loading || response.error || !response.data.isNew) return

    projectFirestore
      .doc(`/orders/${orderId}`)
      .update({ [propertyOf<IOrder>('isNew')]: false })
  }, [response, orderId])

  if (response.loading) return <FullPageLoader />
  if (response.error) return <ErrorPage error={response.error} />

  const order = response.data

  const handleResolved = () => {
    projectFirestore
      .doc(`/orders/${orderId}`)
      .update({ [propertyOf<IOrder>('resolved')]: !order.resolved })
  }

  return (
    <Container>
      <PageMinHeightWrapper>
        <PageTitle>Order</PageTitle>

        <Row>
          <span>Id:</span>
          {order.id}
        </Row>
        <Row>
          <span>Placed:</span>
          {moment(order.placed.toDate()).format('MMMM Do YYYY, H:mm')}
        </Row>
        <Row>
          <span>Name:</span>
          {order.cutomerName || '-'}
        </Row>
        <Row>
          <span>Email:</span>
          {order.customerEmail}
        </Row>
        <Row>
          <span>Message:</span>
          <Message>{order.customerMessage || '-'}</Message>
        </Row>
        <Row>
          <span>State:</span>
          {order.resolved ? (
            <State>
              Resolved <ResolvedIcon />
            </State>
          ) : (
            <State>
              Pending <PendingIcon />
            </State>
          )}
          <Button onClick={handleResolved}>
            {order.resolved ? 'Set pending' : 'Set resolved'}
          </Button>
        </Row>
      </PageMinHeightWrapper>
    </Container>
  )
}

export default OrderDetail
