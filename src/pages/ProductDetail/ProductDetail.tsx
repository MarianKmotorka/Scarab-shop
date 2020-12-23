import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../components/Button/Button'

import { Container } from '../../components/Container'
import Loader from '../../components/Loader/Loader'
import { PageTitle } from '../../components/PageTitle'
import { IProduct } from '../../domain'
import { useFirestoreDoc } from '../../hooks'
import ErrorPage from '../ErrorPage'
import Price from './Price'

import {
  Section,
  ImagesContainer,
  SectionTitle,
  MainImage,
  ProductInfo,
  SmallImage,
  SmallImagesGrid,
  Wrapper,
} from './ProductDetail.styled'

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>()
  const [response] = useFirestoreDoc<IProduct>(`/products/${productId}`)
  const [mainImage, setMainImage] = useState('')

  if (response.loading) return <Loader />
  if (response.error) return <ErrorPage error={response.error} />

  const product = response.data

  return (
    <Container>
      <PageTitle>{product.name}</PageTitle>

      <Wrapper>
        <ImagesContainer>
          <MainImage src={mainImage || product.imageUrls[0]} />

          <SmallImagesGrid>
            {product.imageUrls.map(x => (
              <SmallImage key={x} src={x} onClick={() => setMainImage(x)} />
            ))}
          </SmallImagesGrid>
        </ImagesContainer>

        <ProductInfo>
          <SectionTitle>INFO:</SectionTitle>
          <Section>{product.description || '-'}</Section>

          <SectionTitle>CENA:</SectionTitle>
          <Section>
            <Price product={product} />
          </Section>

          <Section spaceBetween>
            <>{product.numberInStock} ks</>

            {/* TODO: Add amount picker*/}
            <Button>DO KOŠÍKA</Button>
          </Section>
        </ProductInfo>
      </Wrapper>
    </Container>
  )
}

export default ProductDetail
