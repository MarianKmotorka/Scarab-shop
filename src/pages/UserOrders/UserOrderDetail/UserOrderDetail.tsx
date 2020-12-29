import { useTranslation } from 'react-i18next'
import { useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import keys from 'lodash/keys'
import moment from 'moment'

import Product from './Product'
import ErrorPage from '../../ErrorPage'
import { FieldPath } from '../../../firebase/config'
import { IProduct, IUserOrder } from '../../../domain'
import { PageTitle } from '../../../components/PageTitle'
import { Container } from '../../../components/Container'
import { FullPageLoader } from '../../../components/Loader/Loader'
import { useFirestoreDoc, useFirestoreQuery } from '../../../hooks'
import { useAuthorizedUser } from '../../../contextProviders/AuthProvider'
import { PageMinHeightWrapper } from '../../../components/PageMinHeightWrapper'

import { MarginBottom, Message, Row } from './UserOrderDetail.styled'

const UserOrderDetail = () => {
  const { t, i18n } = useTranslation()
  const { currentUser } = useAuthorizedUser()
  const { orderId } = useParams<{ orderId: string }>()
  const [orderResponse] = useFirestoreDoc<IUserOrder>(
    `/users/${currentUser.id}/ordersHistory/${orderId}`
  )

  const productIds = useMemo(
    () =>
      !orderResponse.loading && !orderResponse.error
        ? keys(orderResponse.data.products)
        : [],
    [orderResponse]
  )

  const [products, productsLoading, productsError] = useFirestoreQuery<IProduct>(
    useCallback(
      db => db.collection('products').where(FieldPath.documentId(), 'in', productIds),
      [productIds]
    ),
    { startFetching: !orderResponse.loading && !orderResponse.error }
  )

  if (orderResponse.loading || productsLoading) return <FullPageLoader />
  if (orderResponse.error) return <ErrorPage error={orderResponse.error} />
  if (productsError) return <ErrorPage error={productsError} />

  const order = orderResponse.data

  return (
    <PageMinHeightWrapper>
      <PageTitle>{t('scarabeus.orderDetail')}</PageTitle>

      <Container>
        <MarginBottom>
          <Row>
            <span>Id:</span>
            {order.id}
          </Row>

          <Row>
            <span>{t('scarabeus.placed')}:</span>
            {moment(order.placed.toDate()).format(
              i18n.language === 'sk' ? 'DD.MM. YYYY, H:mm' : 'MMMM Do YYYY, H:mm'
            )}
          </Row>

          <Row>
            <span>{t('scarabeus.name')}:</span>
            {order.cutomerName || '-'}
          </Row>

          <Row>
            <span>{t('scarabeus.email')}:</span>
            {order.customerEmail}
          </Row>

          <Row>
            <span>{t('scarabeus.message')}:</span>
            <Message>{order.customerMessage || '-'}</Message>
          </Row>
        </MarginBottom>

        {products.map(x => (
          <Product key={x.id} product={x} amount={order.products[x.id]} />
        ))}
      </Container>
    </PageMinHeightWrapper>
  )
}

export default UserOrderDetail
