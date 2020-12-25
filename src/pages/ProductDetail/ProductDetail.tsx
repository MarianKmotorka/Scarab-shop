import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../components/Button/Button'

import { Container } from '../../components/Container'
import Loader from '../../components/Loader/Loader'
import { PageTitle } from '../../components/PageTitle'
import { useCart } from '../../contextProviders/CartProvider'
import { IProduct } from '../../domain'
import { useFirestoreDoc } from '../../hooks'
import ErrorPage from '../ErrorPage'
import Price from './Price'

import {
  SectionBody,
  ImagesContainer,
  SectionTitle,
  MainImage,
  ProductInfo,
  SmallImage,
  SmallImagesGrid,
  Wrapper,
  Section,
} from './ProductDetail.styled'

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>()
  const [response] = useFirestoreDoc<IProduct>(`/products/${productId}`)
  const [mainImage, setMainImage] = useState('')
  const { addOrUpdateProduct, isInCart, removeProduct } = useCart()

  if (response.loading) return <Loader />
  if (response.error) return <ErrorPage error={response.error} />

  const product = response.data
  const isOutOfStock = product.numberInStock === 0

  const handleAddOrRemoveFromCart = () => {
    if (isInCart(productId)) removeProduct(productId)
    else addOrUpdateProduct(productId)
  }

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
          {product.description && (
            <Section>
              <SectionTitle>INFO:</SectionTitle>
              <SectionBody>{product.description}</SectionBody>
            </Section>
          )}

          <Section>
            <SectionTitle>CENA:</SectionTitle>
            <SectionBody>
              <Price product={product} />
            </SectionBody>

            <SectionBody spaceBetween>
              {isOutOfStock ? (
                <p style={{ color: 'red' }}>Vypredané</p>
              ) : (
                <p>{product.numberInStock} ks</p>
              )}

              {!isOutOfStock && (
                <Button onClick={handleAddOrRemoveFromCart}>
                  {isInCart(product.id) ? 'ODOBRAT' : 'DO KOŠÍKA'}
                </Button>
              )}
            </SectionBody>
          </Section>
        </ProductInfo>
      </Wrapper>
    </Container>
  )
}

export default ProductDetail
