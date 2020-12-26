import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import ErrorPage from '../ErrorPage'
import { propertyOf } from '../../utils/utils'
import { useFirestoreQuery } from '../../hooks'
import Loader from '../../components/Loader/Loader'
import { PageTitle } from '../../components/PageTitle'
import { Container } from '../../components/Container'
import { IProduct, ProductCategory } from '../../domain'
import ProductCard from '../../components/ProductCard/ProductCard'
import { PageMinHeightWrapper } from '../../components/PageMinHeightWrapper'

import { Grid } from './Butterflies.styled'

const Butterflies = () => {
  const { t } = useTranslation()
  const butterflyCategory: ProductCategory = 'butterfly'
  const [butterflies, loading, error] = useFirestoreQuery<IProduct>(
    useCallback(
      x =>
        x
          .collection('products')
          .where(propertyOf<IProduct>('category'), '==', butterflyCategory),
      []
    )
  )

  if (error) return <ErrorPage error={error} />

  return (
    <PageMinHeightWrapper>
      <Container>
        <PageTitle>{t('scarabeus.butterflies')}</PageTitle>

        {!loading && butterflies.length === 0 && <p>{t('scarabeus.nothingFound')}</p>}

        <Grid>
          {butterflies.map(x => (
            <ProductCard key={x.id} product={x} />
          ))}
        </Grid>

        {loading && <Loader />}
      </Container>
    </PageMinHeightWrapper>
  )
}

export default Butterflies
