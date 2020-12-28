import { useHistory, useParams } from 'react-router-dom'

import ErrorPage from '../../ErrorPage'
import { useFirestoreDoc } from '../../../hooks'
import Button from '../../../components/Button/Button'
import { Container } from '../../../components/Container'
import { ProductCategory, IProduct } from '../../../domain'
import HookForm from '../../../components/HookForm/HookForm'
import { FullPageLoader } from '../../../components/Loader/Loader'
import HookFormInput from '../../../components/HookForm/HookFormInput'
import { useApiError } from '../../../contextProviders/ApiErrorProvider'
import HookFormSelect from '../../../components/HookForm/HookFormSelect'
import HookFormTextArea from '../../../components/HookForm/HookFormTextArea'
import { createProduct, editProduct } from '../../../services/ProductService'

import { Directions, SectionTitle, Wrapper } from './CreateOrEditProduct.styled.'

interface IFormValues {
  name: string
  category: ProductCategory
  minPrice: string // hook form return string for some reason
  maxPrice: string
  description: string | null
  descriptionSK: string | null
  numberInStock: string
}

const CreateOrEditProduct = () => {
  const { setError } = useApiError()
  const { productId } = useParams<{ productId?: string }>()
  const history = useHistory()
  const [response] = useFirestoreDoc<IProduct>(`/products/${productId}`, {
    startFetching: !!productId,
  })

  const isEdit = !!productId

  if (response.loading && isEdit) return <FullPageLoader />
  if (response.loading === false && response.error)
    return <ErrorPage error={response.error} />

  const defaultValues = !response.loading
    ? {
        ...response.data,
        minPrice: `${response.data.minPrice}`,
        maxPrice: `${response.data.maxPrice}`,
        numberInStock: `${response.data.numberInStock}`,
      }
    : {}

  const handleSubmit = async (values: IFormValues) => {
    const product: Omit<IProduct, 'id'> = {
      ...values,
      minPrice: parseInt(values.minPrice),
      maxPrice: parseInt(values.maxPrice),
      numberInStock: parseInt(values.numberInStock),
      imageUrls: !response.loading ? response.data.imageUrls : [],
    }

    if (productId) {
      await editProduct({ ...product, id: productId }, setError)
      history.push(`/products/${productId}`)
    } else {
      const id = await createProduct(product, setError)
      history.push(`/admin/products/${id}/edit`)
    }
  }

  return (
    <Container>
      <Wrapper>
        {isEdit && <SectionTitle>Edit pictures</SectionTitle>}

        <SectionTitle>{isEdit ? 'Edit fields' : 'Create product'}</SectionTitle>
        <HookForm<IFormValues> defaultValues={defaultValues} handleSubmit={handleSubmit}>
          {({ submitting }) => (
            <>
              {!isEdit && (
                <Directions>
                  <strong>Note:</strong> You can add pictures after you create product.
                </Directions>
              )}

              <HookFormInput
                name='name'
                label='Name'
                options={{ required: 'Required' }}
              />
              <HookFormInput
                name='minPrice'
                label='Min price'
                type='number'
                options={{ required: 'Required' }}
              />
              <HookFormInput name='maxPrice' label='Max price' type='number' />
              <HookFormInput
                name='numberInStock'
                label='Number in stock'
                type='number'
                options={{ required: 'Required' }}
              />
              <HookFormSelect
                name='category'
                label='Category'
                selectOptions={[
                  { key: 'butterfly', value: 'Butterflies' },
                  { key: 'beetle', value: 'Beetles' },
                ]}
              />
              <HookFormTextArea
                rows={4}
                name='description'
                label='Description EN'
                options={{ required: 'Required' }}
              />
              <HookFormTextArea
                rows={4}
                name='descriptionSK'
                label='Description SK'
                options={{ required: 'Required' }}
              />

              <Button type='submit' isLoading={submitting} reversed>
                {isEdit ? 'Save' : 'Create'}
              </Button>
            </>
          )}
        </HookForm>
      </Wrapper>
    </Container>
  )
}

export default CreateOrEditProduct
