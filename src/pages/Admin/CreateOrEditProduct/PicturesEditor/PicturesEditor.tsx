import { ChangeEvent, useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'

import ErrorPage from '../../../ErrorPage'
import { IProduct } from '../../../../domain'
import { useStorage } from '../../../../hooks'
import { propertyOf } from '../../../../utils/utils'
import Button from '../../../../components/Button/Button'
import { projectFirestore } from '../../../../firebase/config'
import { useApiError } from '../../../../contextProviders/ApiErrorProvider'
import { deleteImagesFromStorage } from '../../../../services/ProductService'

import {
  Error,
  HiddenFileInput,
  Image,
  ImagesContainer,
  Wrapper,
} from './PicturesEditor.styled'

interface IProps {
  product: IProduct
}

const PicturesEditor = ({ product }: IProps) => {
  const { setError } = useApiError()
  const [deleteActive, setDeleteActive] = useState(false)
  const [validationError, setValidationError] = useState<string>()
  const [picture, setPicture] = useState<File>()
  const fileName = `product_images/${new Date().toISOString()}_${picture?.name}`

  const { progress, url, error: uploadError } = useStorage(fileName, picture, () =>
    setPicture(undefined)
  )

  useEffect(() => {
    if (!url) return

    projectFirestore
      .doc(`products/${product.id}`)
      .update({ [propertyOf<IProduct>('imageUrls')]: [...product.imageUrls, url] })
      .catch(setError)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, setError]) // Note: I want to run effect just on url change

  const handleInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return
    setValidationError(undefined)

    if (!file.type.startsWith('image/'))
      return setValidationError('You can upload images only.')

    setPicture(file)
  }

  const handleImageClicked = async (url: string) => {
    let newUrls = product.imageUrls.filter(x => x !== url)

    if (deleteActive) {
      await deleteImagesFromStorage([url])
      setDeleteActive(false)
    } else {
      // Note: if delete is NOT active -> set image as primary
      newUrls = [url, ...newUrls]
    }

    await projectFirestore
      .doc(`products/${product.id}`)
      .update({ [propertyOf<IProduct>('imageUrls')]: newUrls })
      .catch(setError)
  }

  if (uploadError) return <ErrorPage error={uploadError} />

  return (
    <Wrapper>
      {validationError && <Error>{validationError}</Error>}

      <ImagesContainer>
        {product.imageUrls.map(x => (
          <Image
            key={x}
            src={x}
            deleteActive={deleteActive}
            onClick={async () => await handleImageClicked(x)}
          />
        ))}

        <Button
          isLoading={!!picture}
          loadingProgress={progress}
          onClick={() => document.getElementById('picture_editor_file_input')?.click()}
        >
          +
        </Button>

        <Button
          reversed={deleteActive}
          onClick={() => setDeleteActive(x => !x)}
          hover={false}
        >
          <FaTrash color='red' />
        </Button>
      </ImagesContainer>

      <HiddenFileInput
        type='file'
        accept='image/*'
        id='picture_editor_file_input'
        onChange={handleInputChanged}
      />
    </Wrapper>
  )
}

export default PicturesEditor
