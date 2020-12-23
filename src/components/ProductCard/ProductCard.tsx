import { IProduct } from '../../domain'
import { Body, Image, Info, Price, Wrapper } from './ProductCard.styled'

interface IProductCardProps {
  product: IProduct
}

const ProductCard = ({ product }: IProductCardProps) => {
  const isOutOfStock = product.numberInStock === 0

  return (
    <Wrapper to={`/products/${product.id}`}>
      <Image src={product.imageUrls[0]} isOutOfStock={isOutOfStock} />

      <Body>
        <h1>{product.name}</h1>
        <Info>
          {isOutOfStock ? (
            <p style={{ color: 'red' }}>Vypredané</p>
          ) : (
            <p>{product.numberInStock} kusov</p>
          )}

          <Price>
            od <span>{product.minPrice}€</span>
          </Price>
        </Info>
      </Body>
    </Wrapper>
  )
}

export default ProductCard
