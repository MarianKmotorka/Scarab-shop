import { Container } from '../../../../components/Container'
import { PageMinHeightWrapper } from '../../../../components/PageMinHeightWrapper'
import { SectionTitle } from './EditProduct.styled'

const EditProduct = () => {
  return (
    <Container>
      <PageMinHeightWrapper>
        <SectionTitle>Edit fields</SectionTitle>
        <SectionTitle>Edit pictures</SectionTitle>
      </PageMinHeightWrapper>
    </Container>
  )
}

export default EditProduct
