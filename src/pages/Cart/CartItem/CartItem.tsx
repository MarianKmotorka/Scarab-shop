import { useTranslation } from 'react-i18next'
import Button from '../../../components/Button/Button'
import { useCart } from '../../../contextProviders/CartProvider'
import { IProduct } from '../../../domain'
import { Image, Wrapper, ProductName, Controls } from './CartItem.styled'

interface ICartItemProps {
  product: IProduct
}

const CartItem = ({ product }: ICartItemProps) => {
  const { addOrUpdateProduct, removeProduct, products } = useCart()
  const { t } = useTranslation()

  const { id } = product
  const amountInCart = products[id]

  const handleIncreased = () => {
    addOrUpdateProduct(id, amountInCart + 1)
  }

  const handleDecreased = () => {
    addOrUpdateProduct(id, amountInCart - 1)
  }

  return (
    <Wrapper>
      <Image src={product.imageUrls[0]} />
      <ProductName to={`/products/${id}`}>{product.name}</ProductName>

      <Controls>
        <p style={{ marginRight: 10 }}>
          {amountInCart} {t('scarabeus.pcs')} / {product.numberInStock}{' '}
          {t('scarabeus.pcs')}
        </p>

        <Button
          scale={0.9}
          onClick={handleIncreased}
          disabled={amountInCart === product.numberInStock}
        >
          +
        </Button>

        <Button scale={0.9} onClick={handleDecreased} disabled={amountInCart === 1}>
          -
        </Button>

        <Button scale={0.9} reversed onClick={() => removeProduct(id)}>
          {t('scarabeus.remove')}
        </Button>
      </Controls>
    </Wrapper>
  )
}

export default CartItem
