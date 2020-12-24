import { useCallback, useState } from 'react'

import { Container } from '../../components/Container'
import Loader from '../../components/Loader/Loader'
import { PageTitle } from '../../components/PageTitle'
import { useCart } from '../../contextProviders/CartProvider'
import { IProduct } from '../../domain'
import { FieldPath } from '../../firebase/config'
import { useFirestoreQuery } from '../../hooks'
import { isValidEmail } from '../../utils/utils'
import CartItem from './CartItem/CartItem'

import {
  OrderDirections,
  InputsContainer,
  StyledInput,
  StyledTextArea,
  StyledButton,
  ValidationError,
  SuccessMessage,
} from './Cart.styled'

const Cart = () => {
  const { productIds, removeAll } = useCart()
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const isCartEmpty = productIds.length === 0

  const [productsDb, loading] = useFirestoreQuery<IProduct>(
    useCallback(
      db => db.collection('products').where(FieldPath.documentId(), 'in', productIds),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    ),
    { startFetching: !isCartEmpty }
  )

  const filteredProducts = productsDb.filter(x => productIds.includes(x.id))

  const handleSubmitted = async () => {
    setError('')
    if (!isValidEmail(email)) return setError('Neplatný email')

    setSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
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
            <StyledTextArea rows={4} value={note} onChange={setNote} label='Poznamka' />

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
