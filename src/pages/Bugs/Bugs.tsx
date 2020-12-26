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

import { Grid } from './Bugs.styled'

const Bugs = () => {
  const { t } = useTranslation()
  const bugCategory: ProductCategory = 'bug'
  const [bugs, loading, error] = useFirestoreQuery<IProduct>(
    useCallback(
      x =>
        x
          .collection('products')
          .where(propertyOf<IProduct>('category'), '==', bugCategory),
      []
    )
  )

  if (error) return <ErrorPage error={error} />

  return (
    <PageMinHeightWrapper>
      <Container>
        <PageTitle>{t('scarabeus.bugs')}</PageTitle>

        {!loading && bugs.length === 0 && <p>{t('scarabeus.nothingFound')}</p>}

        <Grid>
          {bugs.map(x => (
            <ProductCard key={x.id} product={x} />
          ))}
        </Grid>

        {loading && <Loader />}
      </Container>
    </PageMinHeightWrapper>
  )
}

export default Bugs
