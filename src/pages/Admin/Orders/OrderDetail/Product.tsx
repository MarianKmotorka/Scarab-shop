import { IProduct } from '../../../../domain'
import {
  ProductAmount,
  ProductImage,
  ProductName,
  ProductWrapper,
} from './OrderDetail.styled'

interface IProductProps {
  product: IProduct
  amount: number
}

const Product = ({ product, amount }: IProductProps) => {
  return (
    <ProductWrapper>
      <ProductImage src={product.imageUrls[0]} />
      <ProductName to={`/products/${product.id}`}>{product.name}</ProductName>
      <ProductAmount>{amount} pcs</ProductAmount>
    </ProductWrapper>
  )
}

export default Product
