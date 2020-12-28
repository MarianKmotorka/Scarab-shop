import { Container } from '../../components/Container'
import { LinksContainer, StyledLink, Wrapper } from './Admin.styled'
import { FaChevronRight } from 'react-icons/fa'

const Admin = () => {
  return (
    <Container>
      <Wrapper>
        <LinksContainer>
          <StyledLink to='/admin/products/create'>
            Create product <FaChevronRight />
          </StyledLink>

          <StyledLink to='/admin/orders'>
            Orders <FaChevronRight />
          </StyledLink>

          <StyledLink to='/admin/statistics'>
            Statisctics <FaChevronRight />
          </StyledLink>
        </LinksContainer>
      </Wrapper>
    </Container>
  )
}

export default Admin
