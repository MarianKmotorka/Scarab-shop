import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MD } from '../../utils/theme'

export const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.3);

  @media screen and (min-width: ${MD}px) {
    transition: transform 0.3s;
    :hover {
      transform: translateY(-7px);
    }
  }
`

export const Image = styled.img<{ isOutOfStock: boolean }>`
  height: 250px;
  width: 100%;
  object-fit: cover;
  display: block;

  ${({ isOutOfStock }) => isOutOfStock && 'filter: grayscale(100%)'};
`

export const Body = styled.div`
  padding: 15px 13px;
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h1 {
    font-size: 1.4rem;
    font-weight: 500;
    color: ${({ theme }) => theme.black};
  }
`

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`

export const Price = styled.p`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  > span {
    margin: 0 5px;
    font-size: 1.7rem;
    font-weight: 500;
    color: ${({ theme }) => theme.primary};
  }
`
