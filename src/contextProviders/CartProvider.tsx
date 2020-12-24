import { createContext, FC, useCallback, useContext, useMemo } from 'react'
import keys from 'lodash/keys'
import omit from 'lodash/omit'
import reduce from 'lodash/reduce'

import { useLocalStorage } from '../hooks'

interface ICartContextValue {
  count: number
  products: Record<string, number> // Note: productId: amount
  productIds: string[]
  addOrUpdateProduct: (productId: string, amount?: number) => void
  removeProduct: (productId: string) => void
  isInCart: (productId: string) => boolean
}

const CartContext = createContext<ICartContextValue>(null!)
export const useCart = () => useContext(CartContext)

const CartProvider: FC = ({ children }) => {
  const [products, setProducts] = useLocalStorage<ICartContextValue['products']>(
    'scarabeus.cart',
    {}
  )

  const isInCart = useCallback((productId: string) => products[productId] !== undefined, [
    products,
  ])

  const removeProduct = useCallback(
    (productId: string) => setProducts(prev => omit(prev, productId)),
    [setProducts]
  )

  const addOrUpdateProduct = useCallback(
    (productId: string, amount: number = 1) => {
      setProducts(prev => ({ ...prev, [productId]: amount }))
    },
    [setProducts]
  )

  const count = useMemo(() => reduce(products, (result, value) => result + value, 0), [
    products,
  ])

  const productIds = useMemo(() => keys(products), [products])

  const value: ICartContextValue = {
    count,
    products,
    productIds,
    isInCart,
    removeProduct,
    addOrUpdateProduct,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
