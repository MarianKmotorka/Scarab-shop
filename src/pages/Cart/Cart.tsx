import { useCallback, useState } from 'react'

import ErrorPage from '../ErrorPage'
import { IProduct } from '../../domain'
import CartItem from './CartItem/CartItem'
import { useFirestoreQuery } from '../../hooks'
import { isValidEmail } from '../../utils/utils'
import { FieldPath } from '../../firebase/config'
import Loader from '../../components/Loader/Loader'
import { PageTitle } from '../../components/PageTitle'
import { Container } from '../../components/Container'
import { useCart } from '../../contextProviders/CartProvider'
import { createOrder } from '../../services/OrderService'
import { useApiError } from '../../contextProviders/ApiErrorProvider'
import HookForm, { IHookFormProps } from '../../components/HookForm/HookForm'

import {
  Directions,
  InputsContainer,
  StyledInput,
  StyledTextArea,
  StyledButton,
  SuccessMessage,
} from './Cart.styled'
import { useAuth } from '../../contextProviders/AuthProvider'
import { Link } from 'react-router-dom'

interface IOrderFormData {
  name: string
  email: string
  message: string
}

const Cart = () => {
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
        cutomerName: name,
        customerEmail: email,
        customerMessage: message,
        userId: auth.isLoggedIn ? auth.currentUser.id : null,
      },
      setApiError
    )

    setSuccess(true)
    removeAll()
  }

  if (success)
    return (
      <Container>
        <SuccessMessage>ODOSLANÉ</SuccessMessage>
      </Container>
    )

  return (
    <Container>
      <PageTitle>Košík</PageTitle>

      {loading && !isCartEmpty && <Loader />}

      {isCartEmpty && <p>Košík je prázdny.</p>}

      {filteredProducts.map(x => (
        <CartItem key={x.id} product={x} />
      ))}

      {!auth.isLoggedIn && (
        <Directions>
          <strong>Nie ste prihlásený/á. </strong> Prihláseným používateľom sa ukladá
          história objednávok.
          <Link to={{ pathname: '/login', state: { returnUrl: '/cart' } }}>
            PRIHLÁSIŤ SA
          </Link>
        </Directions>
      )}

      {!isCartEmpty && (
        <>
          <Directions>
            <strong>Toto nie je reálna objednávka. </strong>Zadajte svoj email a ja sa Vám
            ozvem. Cena taktiež závisí od jednotlivého kusu, takže na tej sa tiež ešte
            dohodneme.
          </Directions>

          <HookForm handleSubmit={handleSubmitted} defaultValues={formDefaultValues}>
            {({ submitting }) => (
              <InputsContainer>
                <StyledInput name='name' label='Meno' />

                <StyledInput
                  name='email'
                  label='Email'
                  options={{ validate: x => isValidEmail(x) || 'Neplatný email.' }}
                />

                <StyledTextArea
                  name='message'
                  label='Poznamka'
                  rows={4}
                  options={{ maxLength: { value: 300, message: 'Max 300 znakov.' } }}
                />

                <StyledButton isLoading={submitting} reversed type='submit'>
                  ODOSLAŤ
                </StyledButton>
              </InputsContainer>
            )}
          </HookForm>
        </>
      )}
    </Container>
  )
}

export default Cart
