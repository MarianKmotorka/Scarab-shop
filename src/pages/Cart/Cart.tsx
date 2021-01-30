import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import ErrorPage from '../ErrorPage'
import { IProduct } from '../../domain'
import CartItem from './CartItem/CartItem'
import { useFirestoreQuery } from '../../hooks'
import { isValidEmail } from '../../utils/utils'
import { FieldPath } from '../../firebase/config'
import Loader from '../../components/Loader/Loader'
import { PageTitle } from '../../components/PageTitle'
import { Container } from '../../components/Container'
import { createOrder } from '../../services/OrderService'
import { useCart } from '../../contextProviders/CartProvider'
import { useAuth } from '../../contextProviders/AuthProvider'
import { useApiError } from '../../contextProviders/ApiErrorProvider'
import { PageMinHeightWrapper } from '../../components/PageMinHeightWrapper'
import HookForm, { IHookFormProps } from '../../components/HookForm/HookForm'

import {
  Directions,
  InputsContainer,
  StyledInput,
  StyledTextArea,
  StyledButton,
  SuccessMessage,
} from './Cart.styled'

interface IOrderFormData {
  name: string
  email: string
  message: string
}

const Cart = () => {
  const { t } = useTranslation()
  const { productIds, products, removeAll } = useCart()
  const [success, setSuccess] = useState(false)
  const { setError: setApiError } = useApiError()
  const auth = useAuth()

  const isCartEmpty = productIds.length === 0

  const [productsDb, loading, fetchError] = useFirestoreQuery<IProduct>(
    useCallback(
      db => db.collection('products').where(FieldPath.documentId(), 'in', productIds),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    ),
    { startFetching: !isCartEmpty }
  )

  if (fetchError) return <ErrorPage error={fetchError} />

  const filteredProducts = productsDb.filter(x => productIds.includes(x.id))

  const formDefaultValues = {
    name: auth.isLoggedIn ? auth.currentUser.name : '',
    email: auth.isLoggedIn ? auth.currentUser.email : '',
  }

  const handleSubmitted: IHookFormProps<IOrderFormData>['handleSubmit'] = async ({
    name,
    email,
    message,
  }) => {
    await createOrder(
      {
        products,
        cutomerName: name.trim(),
        customerEmail: email.trim(),
        customerMessage: message.trim(),
        userId: auth.isLoggedIn ? auth.currentUser.id : null,
        resolved: false,
        isNew: true,
      },
      setApiError
    )

    setSuccess(true)
    removeAll()
  }

  if (success)
    return (
      <Container>
        <PageMinHeightWrapper>
          <SuccessMessage>{t('scarabeus.orderSent')}</SuccessMessage>
        </PageMinHeightWrapper>
      </Container>
    )

  return (
    <PageMinHeightWrapper>
      <PageTitle>{t('scarabeus.cart')}</PageTitle>

      <Container>
        {loading && !isCartEmpty && <Loader />}

        {isCartEmpty && <p>{t('scarabeus.cartIsEmpty')}</p>}

        {filteredProducts.map(x => (
          <CartItem key={x.id} product={x} />
        ))}

        {!auth.isLoggedIn && (
          <Directions>
            <strong>{t('scarabeus.youAreNotLoggedIn')} </strong>{' '}
            {t('scarabeus.ordersAreSavedToHistoryForLoggedinUsers')}
            <Link to={{ pathname: '/login', state: { returnUrl: '/cart' } }}>
              {t('scarabeus.login')}
            </Link>
          </Directions>
        )}

        {!isCartEmpty && (
          <>
            <Directions>
              <strong>{t('scarabeus.thisIsNotRealOrder')}</strong>
              {t('scarabeus.feelFreeToMakeAnOrder')}
            </Directions>

            <HookForm handleSubmit={handleSubmitted} defaultValues={formDefaultValues}>
              {({ submitting }) => (
                <InputsContainer>
                  <StyledInput name='name' label={t('scarabeus.name')} />

                  <StyledInput
                    name='email'
                    label={t('scarabeus.email')}
                    options={{
                      validate: x =>
                        isValidEmail(x) ||
                        (t('scarabeus.validation.invalidEmail') as string),
                    }}
                  />

                  <StyledTextArea
                    name='message'
                    label={t('scarabeus.message')}
                    rows={4}
                    options={{
                      maxLength: {
                        value: 300,
                        message: t('scarabeus.validation.maxChars', { max: 300 }),
                      },
                    }}
                  />

                  <StyledButton isLoading={submitting} reversed type='submit'>
                    {t('scarabeus.makeOrder')}
                  </StyledButton>
                </InputsContainer>
              )}
            </HookForm>
          </>
        )}
      </Container>
    </PageMinHeightWrapper>
  )
}

export default Cart
