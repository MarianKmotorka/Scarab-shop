import { useCallback } from 'react'
import { Link } from 'react-router-dom'

import ErrorPage from '../../ErrorPage'
import { useFirestoreQuery } from '../../../hooks'
import { Container } from '../../../components/Container'
import { PageTitle } from '../../../components/PageTitle'
import { IProduct, IProductStatistics } from '../../../domain'
import { FullPageLoader } from '../../../components/Loader/Loader'

import { Row, Wrapper } from './ProductStatistics.styled'

interface IProductStatViewModel {
  productId: string
  productName: string
  productImage: string
  viewCount: number
}

const ProductStatistics = () => {
  const [productStats, statsLoading, statsError] = useFirestoreQuery<IProductStatistics>(
    useCallback(db => db.collection('productStatistics'), []),
    { realTime: false }
  )
  const [products, productsLoading, productsError] = useFirestoreQuery<IProduct>(
    useCallback(db => db.collection('products'), []),
    { realTime: false }
  )

  if (statsError) return <ErrorPage error={statsError} />
  if (productsError) return <ErrorPage error={productsError} />
  if (statsLoading || productsLoading) return <FullPageLoader />

  const getViewModels = (): IProductStatViewModel[] => {
    const idCountMap = productStats.reduce(
      (acc, curr) => ({ ...acc, [curr.id]: curr.viewedByIps.length }),
      {} as { [key: string]: number }
    )

    return products
      .map(x => ({
        productId: x.id,
        productName: x.name,
        productImage: x.imageUrls[0],
        viewCount: idCountMap[x.id] || 0,
      }))
      .sort((a, b) => b.viewCount - a.viewCount)
  }

  return (
    <Container>
      <Wrapper>
        <PageTitle>Product statistics</PageTitle>

        {getViewModels().map(x => (
          <Row key={x.productId}>
            <img src={x.productImage} alt='product' />
            <Link to={`/products/${x.productId}`}>{x.productName}</Link>
            <p>{x.viewCount}</p>
          </Row>
        ))}
      </Wrapper>
    </Container>
  )
}

export default ProductStatistics
