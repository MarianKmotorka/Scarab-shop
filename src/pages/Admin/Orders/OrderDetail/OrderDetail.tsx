import { useCallback, useEffect, useMemo } from 'react'
import moment from 'moment'
import keys from 'lodash/keys'
import { useParams } from 'react-router-dom'
import { BsClock as PendingIcon, BsCheck as ResolvedIcon } from 'react-icons/bs'

import Product from './Product'
import ErrorPage from '../../../ErrorPage'
import { IOrder, IProduct } from '../../../../domain'
import { propertyOf } from '../../../../utils/utils'
import Button from '../../../../components/Button/Button'
import { PageTitle } from '../../../../components/PageTitle'
import { Container } from '../../../../components/Container'
import { FullPageLoader } from '../../../../components/Loader/Loader'
import { useFirestoreDoc, useFirestoreQuery } from '../../../../hooks'
import { FieldPath, projectFirestore } from '../../../../firebase/config'
import { PageMinHeightWrapper } from '../../../../components/PageMinHeightWrapper'

import { Message, Row, MarginBottom, State } from './OrderDetail.styled'

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>()
  const [orderResponse] = useFirestoreDoc<IOrder>(`/orders/${orderId}`)

  const productIds = useMemo(
    () =>
      !orderResponse.loading && !orderResponse.error
        ? keys(orderResponse.data.products)
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [orderResponse.loading] // Note: depending only on loading so query is not executed after IOrder['resolved'] changed
  )

  const [products, productsLoading, productsError] = useFirestoreQuery<IProduct>(
    useCallback(
      db => db.collection('products').where(FieldPath.documentId(), 'in', productIds),
      [productIds]
    ),
    { startFetching: !orderResponse.loading && !orderResponse.error }
  )

  useEffect(() => {
    if (orderResponse.loading || orderResponse.error || !orderResponse.data.isNew) return

    projectFirestore
      .doc(`/orders/${orderId}`)
      .update({ [propertyOf<IOrder>('isNew')]: false })
  }, [orderResponse, orderId])

  if (orderResponse.loading || productsLoading) return <FullPageLoader />
  if (orderResponse.error) return <ErrorPage error={orderResponse.error} />
  if (productsError) return <ErrorPage error={productsError} />

  const order = orderResponse.data

  const handleResolved = () => {
    projectFirestore
      .doc(`/orders/${orderId}`)
      .update({ [propertyOf<IOrder>('resolved')]: !order.resolved })
  }

  return (
    <Container>
      <PageMinHeightWrapper>
        <PageTitle>Order</PageTitle>

        <MarginBottom>
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
            <Button scale={0.9} onClick={handleResolved}>
              {order.resolved ? 'Set pending' : 'Set resolved'}
            </Button>
          </Row>
        </MarginBottom>

        <MarginBottom>
          {products.map(x => (
            <Product key={x.id} product={x} amount={order.products[x.id]} />
          ))}
        </MarginBottom>
      </PageMinHeightWrapper>
    </Container>
  )
}

export default OrderDetail
