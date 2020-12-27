import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { PageMinHeightWrapper } from '../../components/PageMinHeightWrapper'
import { LG, MD } from '../../utils/theme'

export const Wrapper = styled(PageMinHeightWrapper)``

export const StyledLink = styled(Link)`
  padding: 25px 30px;
  font-size: 1.3rem;
  border-top: solid 1px ${({ theme }) => theme.black};
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;

  :last-child {
    border-bottom: solid 1px ${({ theme }) => theme.black};
  }

  :hover {
    background: ${({ theme }) => theme.white2};
    padding-left: 40px;
    svg {
      opacity: 1;
    }
  }

  @media screen and (min-width: ${LG}px) {
    svg {
      opacity: 0;
    }
  }

  @media screen and (max-width: ${MD}px) {
    padding: 25px 10px;
  }
`

export const LinksContainer = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
`
