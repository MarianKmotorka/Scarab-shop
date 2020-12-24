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

import {
  OrderDirections,
  InputsContainer,
  StyledInput,
  StyledTextArea,
  StyledButton,
  ValidationError,
  SuccessMessage,
} from './Cart.styled'
import { createOrder } from '../../services/OrderService'
import { useApiError } from '../../contextProviders/ApiErrorProvider'

const Cart = () => {
  const { productIds, products, removeAll } = useCart()
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const { setError: setApiError } = useApiError()

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

  const handleSubmitted = async () => {
    setError('')
    if (!isValidEmail(email)) return setError('Neplatný email')

    setSubmitting(true)
    await createOrder(
      {
        products,
        cutomerName: name,
        customerEmail: email,
        customerMessage: message,
      },
      setApiError
    )
    setSubmitting(false)

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

      {!isCartEmpty && (
        <>
          <OrderDirections>
            <strong>Toto nie je reálna objednávka. </strong>Zadajte svoj email a ja sa Vám
            ozvem. Cena taktiež závisí od jednotlivého kusu, takže na tej sa tiež ešte
            dohodneme.
          </OrderDirections>

          <InputsContainer>
            {error && <ValidationError>{error}</ValidationError>}

            <StyledInput value={name} onChange={setName} label='Meno' />
            <StyledInput value={email} onChange={setEmail} label='Email' />

            {/* TODO: Remove for logged in user*/}
            <StyledTextArea
              rows={4}
              value={message}
              onChange={setMessage}
              label='Poznamka'
            />

            <StyledButton onClick={handleSubmitted} isLoading={submitting} reversed>
              ODOSLAŤ
            </StyledButton>
          </InputsContainer>
        </>
      )}
    </Container>
  )
}

export default Cart
