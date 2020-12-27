import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button/Button'
import { useHistory, useParams } from 'react-router-dom'

import Price from './Price'
import { IProduct } from '../../domain'
import ErrorPage from '../ErrorPage'
import { useFirestoreDoc } from '../../hooks'
import { PageTitle } from '../../components/PageTitle'
import { Container } from '../../components/Container'
import { useCart } from '../../contextProviders/CartProvider'
import { useAuth } from '../../contextProviders/AuthProvider'
import { FullPageLoader } from '../../components/Loader/Loader'

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
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const auth = useAuth()
  const history = useHistory()
  const { productId } = useParams<{ productId: string }>()
  const [response] = useFirestoreDoc<IProduct>(`/products/${productId}`)
  const [mainImage, setMainImage] = useState('')
  const { addOrUpdateProduct, isInCart, removeProduct } = useCart()

  if (response.loading) return <FullPageLoader />
  if (response.error) return <ErrorPage error={response.error} />

  const product = response.data
  const isOutOfStock = product.numberInStock === 0
  const isAdmin = auth.isLoggedIn && auth.currentUser.isAdmin
  const description = language === 'sk' ? product.descriptionSK : product.description

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
          {description && (
            <Section>
              <SectionTitle>INFO:</SectionTitle>
              <SectionBody>{description}</SectionBody>
            </Section>
          )}

          <Section>
            <SectionTitle>{t('scarabeus.price')}:</SectionTitle>
            <SectionBody>
              <Price product={product} />
            </SectionBody>

            <SectionBody spaceBetween>
              {isOutOfStock ? (
                <p style={{ color: 'red' }}>{t('scarabeus.soldOut')}</p>
              ) : (
                <p>
                  {product.numberInStock} {t('scarabeus.pcs')}
                </p>
              )}

              {!isOutOfStock && (
                <Button onClick={handleAddOrRemoveFromCart}>
                  {isInCart(product.id)
                    ? t('scarabeus.remove')
                    : t('scarabeus.addToCart')}
                </Button>
              )}
            </SectionBody>
          </Section>

          {isAdmin && (
            <Section>
              <SectionTitle>Admin</SectionTitle>
              <SectionBody>
                <Button
                  onClick={() => history.push(`/admin/products/${product.id}/edit`)}
                >
                  Edit
                </Button>
                <Button>Delete</Button>
              </SectionBody>
            </Section>
          )}
        </ProductInfo>
      </Wrapper>
    </Container>
  )
}

export default ProductDetail
