import { useTranslation } from 'react-i18next'
import { IProduct } from '../../../domain'
import {
  ProductAmount,
  ProductImage,
  ProductName,
  ProductWrapper,
} from './UserOrderDetail.styled'

interface IProductProps {
  product: IProduct
  amount: number
}

const Product = ({ product, amount }: IProductProps) => {
  const { t } = useTranslation()

  return (
    <ProductWrapper>
      <ProductImage src={product.imageUrls[0]} />
      <ProductName to={`/products/${product.id}`}>{product.name}</ProductName>
      <ProductAmount>
        {amount} {t('scarabeus.pcs')}
      </ProductAmount>
    </ProductWrapper>
  )
}

export default Product
