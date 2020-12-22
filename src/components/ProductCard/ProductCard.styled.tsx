import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Wrapper = styled(Link)`
  border-radius: 15px;
  overflow: hidden;
`

export const Image = styled.img<{ isOutOfStock: boolean }>`
  max-height: 250px;
  width: 100%;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
  display: block;

  ${({ isOutOfStock }) => isOutOfStock && 'filter: grayscale(100%)'};
`

export const Body = styled.div`
  padding: 15px 13px;
  border: 1px solid ${({ theme }) => theme.black};
  border-radius: 0 0 15px 15px;
  border-top: none;

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
