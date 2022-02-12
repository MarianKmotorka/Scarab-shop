import { IProduct } from '../../domain'
import { Body, Image, Wrapper } from './ProductCard.styled'

interface IProductCardProps {
  product: IProduct
}

const ProductCard = ({ product }: IProductCardProps) => {
  const isOutOfStock = product.numberInStock === 0

  return (
    <Wrapper to={`/products/${product.id}`}>
      <Image src={product.imageUrls[0]} isOutOfStock={isOutOfStock} debounce={0} />

      <Body>
        <h1>{product.name}</h1>
        {/* <Info>
          {isOutOfStock ? (
            <p style={{ color: 'red' }}>{t('scarabeus.soldOut')}</p>
          ) : (
            <p>
              {product.numberInStock} {t('scarabeus.pcs')}
            </p>
          )}

          <Price>
            {t('scarabeus.from')} <span>{product.minPrice}€</span>
          </Price>
        </Info> */}
      </Body>
    </Wrapper>
  )
}

export default ProductCard
