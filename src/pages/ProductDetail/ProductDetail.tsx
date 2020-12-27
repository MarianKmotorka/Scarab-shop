import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button/Button'
import { useHistory, useParams } from 'react-router-dom'

import Price from './Price'
import ErrorPage from '../ErrorPage'
import { IProduct } from '../../domain'
import { useFirestoreDoc } from '../../hooks'
import Modal from '../../components/Modal/Modal'
import { PageTitle } from '../../components/PageTitle'
import { Container } from '../../components/Container'
import { useCart } from '../../contextProviders/CartProvider'
import { useAuth } from '../../contextProviders/AuthProvider'
import { FullPageLoader } from '../../components/Loader/Loader'
import { deleteProduct } from '../../services/ProductService'
import { useApiError } from '../../contextProviders/ApiErrorProvider'

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
import { PageMinHeightWrapper } from '../../components/PageMinHeightWrapper'

const ProductDetail = () => {
  const auth = useAuth()
  const { setError } = useApiError()
  const history = useHistory()
  const { t, i18n } = useTranslation()
  const [mainImage, setMainImage] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteProductLoading, setDeleteProductLoading] = useState(false)
  const { productId } = useParams<{ productId: string }>()
  const { addOrUpdateProduct, isInCart, removeProduct } = useCart()
  const [response] = useFirestoreDoc<IProduct>(`/products/${productId}`)

  if (response.loading) return <FullPageLoader />
  if (response.error) return <ErrorPage error={response.error} />

  const product = response.data
  const isOutOfStock = product.numberInStock === 0
  const isAdmin = auth.isLoggedIn && auth.currentUser.isAdmin
  const description = i18n.language === 'sk' ? product.descriptionSK : product.description

  const handleAddOrRemoveFromCart = () => {
    if (isInCart(productId)) removeProduct(productId)
    else addOrUpdateProduct(productId)
  }

  const handleDeleteProduct = async () => {
    setDeleteProductLoading(true)
    await deleteProduct(product, setError)
    setDeleteProductLoading(false)
    setDeleteModal(false)
    history.goBack()
  }

  return (
    <PageMinHeightWrapper>
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
                  <Button
                    onClick={() => setDeleteModal(true)}
                    isLoading={deleteProductLoading}
                  >
                    Delete
                  </Button>
                </SectionBody>
              </Section>
            )}
          </ProductInfo>
        </Wrapper>

        <Modal
          text='Are you sure you want to delete this product ?'
          visible={deleteModal}
          onClose={() => setDeleteModal(false)}
          onConfirm={handleDeleteProduct}
        />
      </Container>
    </PageMinHeightWrapper>
  )
}

export default ProductDetail
