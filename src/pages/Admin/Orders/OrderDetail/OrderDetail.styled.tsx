import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MD, SM } from '../../../../utils/theme'

export const MarginBottom = styled.div`
  margin-bottom: 40px;
`

export const Row = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 20px;

  :nth-of-type(odd) {
    background-color: ${({ theme }) => theme.white2};
  }

  span {
    display: block;
    min-width: 70px;
    font-size: inherit;
    font-weight: 500;
    margin-right: 15px;
  }

  button:first-of-type {
    margin-left: auto;
  }

  @media screen and (max-width: ${SM}px) {
    button {
      margin-top: 10px;
    }
  }

  a {
    text-decoration: underline;

    :hover {
      font-weight: 500;
    }
  }
`

export const Message = styled.p`
  white-space: pre-line;
`

export const State = styled.p`
  display: flex;
  align-items: center;

  svg {
    font-size: 1.2rem;
    margin-left: 10px;
  }
`

export const ProductWrapper = styled.div`
  padding: 12px 30px;
  border-top: solid 1px ${({ theme }) => theme.black};

  display: flex;
  align-items: center;
  flex-wrap: wrap;

  :last-of-type {
    border-bottom: solid 1px ${({ theme }) => theme.black};
  }

  :hover {
    background-color: ${({ theme }) => theme.white2};
  }

  @media screen and (max-width: ${MD}px) {
    padding: 12px 0;
  }
`

export const ProductImage = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  display: block;
  border-radius: 3px;
  margin-right: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`

export const ProductName = styled(Link)`
  font-size: 1.1rem;

  :hover {
    font-weight: 500;
    border-bottom: 1px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
  }
`

export const ProductAmount = styled.p`
  margin-left: auto;
  padding-left: 5px;
`
