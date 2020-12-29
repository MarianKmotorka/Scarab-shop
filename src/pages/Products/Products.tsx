import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import ErrorPage from '../ErrorPage'
import { IProduct } from '../../domain'
import { useFirestoreQuery } from '../../hooks'
import Loader from '../../components/Loader/Loader'
import { PageTitle } from '../../components/PageTitle'
import { Container } from '../../components/Container'
import ProductCard from '../../components/ProductCard/ProductCard'
import { PageMinHeightWrapper } from '../../components/PageMinHeightWrapper'

import { Grid } from './Products.styled'

const Products = () => {
  const { t } = useTranslation()
  const [products, loading, error] = useFirestoreQuery<IProduct>(
    useCallback(x => x.collection('products'), [])
  )

  if (error) return <ErrorPage error={error} />

  return (
    <PageMinHeightWrapper>
      <PageTitle>{t('scarabeus.products')}</PageTitle>

      <Container>
        {!loading && products.length === 0 && <p>{t('scarabeus.nothingFound')}</p>}

        <Grid>
          {products.map(x => (
            <ProductCard key={x.id} product={x} />
          ))}
        </Grid>

        {loading && <Loader />}
      </Container>
    </PageMinHeightWrapper>
  )
}

export default Products
