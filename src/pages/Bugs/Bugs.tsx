import { useCallback } from 'react'

import ErrorPage from '../ErrorPage'
import { propertyOf } from '../../utils/utils'
import { useFirestoreQuery } from '../../hooks'
import Loader from '../../components/Loader/Loader'
import { PageTitle } from '../../components/PageTitle'
import { Container } from '../../components/Container'
import { IProduct, ProductCategory } from '../../domain'
import ProductCard from '../../components/ProductCard/ProductCard'

import { Grid, Wrapper } from './Bugs.styled'

const Bugs = () => {
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
    <Wrapper>
      <Container>
        <PageTitle>Chrobáky</PageTitle>

        {!loading && bugs.length === 0 && <p>Nothing found</p>}

        <Grid>
          {bugs.map(x => (
            <ProductCard key={x.id} product={x} />
          ))}
        </Grid>

        {loading && <Loader />}
      </Container>
    </Wrapper>
  )
}

export default Bugs
