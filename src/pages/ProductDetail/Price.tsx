import { useTranslation } from 'react-i18next'
import { IProduct } from '../../domain'
import { Money } from './ProductDetail.styled'

const Price = ({ product }: { product: IProduct }) => {
  const { t } = useTranslation()

  if (!product.maxPrice) return <Money fontSize='1.5rem'>{product.minPrice}€</Money>

  return (
    <>
      {t('scarabeus.from')} <Money fontSize='1.5rem'>{product.minPrice}€</Money>{' '}
      {t('scarabeus.to')} <Money fontSize='inherit'>{product.maxPrice}€</Money>
    </>
  )
}

export default Price
