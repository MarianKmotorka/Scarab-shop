import styled from 'styled-components'
import { PageMinHeightWrapper } from '../../../components/PageMinHeightWrapper'
import { MD } from '../../../utils/theme'

export const Wrapper = styled(PageMinHeightWrapper)``

export const Row = styled.div`
  padding: 15px 30px;
  display: flex;
  align-items: center;

  :nth-of-type(odd) {
    background-color: ${({ theme }) => theme.white2};
  }

  img {
    height: 85px;
    width: 85px;
    object-fit: cover;
    display: block;
    border-radius: 3px;
    margin-right: 5px;
  }

  a {
    transition: all 0.25s;

    :hover {
      font-weight: 500;
      text-decoration: underline;
    }
  }

  p {
    margin-left: auto;
  }

  @media screen and (max-width: ${MD}px) {
    padding: 15px 0;
  }
`
