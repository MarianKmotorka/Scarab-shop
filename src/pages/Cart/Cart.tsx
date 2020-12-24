import { useCallback } from 'react'
import { Container } from '../../components/Container'
import Loader from '../../components/Loader/Loader'
import { PageTitle } from '../../components/PageTitle'
import { useCart } from '../../contextProviders/CartProvider'
import { IProduct } from '../../domain'
import { FieldPath } from '../../firebase/config'
import { useFirestoreQuery } from '../../hooks'
import CartItem from './CartItem/CartItem'

const Cart = () => {
  const { productIds } = useCart()

  const isCartEmpty = productIds.length === 0

  // Load products once
  const [productsDb, loading] = useFirestoreQuery<IProduct>(
    useCallback(
      db => db.collection('products').where(FieldPath.documentId(), 'in', productIds),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    ),
    { startFetching: !isCartEmpty }
  )

  const filteredProducts = productsDb.filter(x => productIds.includes(x.id))

  return (
    <Container>
      <PageTitle>Košík</PageTitle>

      {loading && !isCartEmpty && <Loader />}

      {isCartEmpty && <p>Košík je prázdny.</p>}

      {filteredProducts.map(x => (
        <CartItem key={x.id} product={x} />
      ))}
    </Container>
  )
}

export default Cart
