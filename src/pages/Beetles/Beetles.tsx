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

import { Grid } from './Beetles.styled'

const Bugs = () => {
  const { t } = useTranslation()
  const beetleCategory: ProductCategory = 'beetle'
  const [beetles, loading, error] = useFirestoreQuery<IProduct>(
    useCallback(
      x =>
        x
          .collection('products')
          .where(propertyOf<IProduct>('category'), '==', beetleCategory),
      []
    )
  )

  if (error) return <ErrorPage error={error} />

  return (
    <PageMinHeightWrapper>
      <Container>
        <PageTitle>{t('scarabeus.beetles')}</PageTitle>

        {!loading && beetles.length === 0 && <p>{t('scarabeus.nothingFound')}</p>}

        <Grid>
          {beetles.map(x => (
            <ProductCard key={x.id} product={x} />
          ))}
        </Grid>

        {loading && <Loader />}
      </Container>
    </PageMinHeightWrapper>
  )
}

export default Bugs
