import { IProduct } from '../../domain'
import { Money } from './ProductDetail.styled'

const Price = ({ product }: { product: IProduct }) => {
  if (!product.maxPrice) return <Money fontSize='1.5rem'>{product.minPrice}€</Money>

  return (
    <>
      Od <Money fontSize='1.5rem'>{product.minPrice}€</Money> do{' '}
      <Money fontSize='inherit'>{product.maxPrice}€</Money>
    </>
  )
}

export default Price
