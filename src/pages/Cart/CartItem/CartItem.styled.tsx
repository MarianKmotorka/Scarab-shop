import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MD } from '../../../utils/theme'

export const Wrapper = styled.li`
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

export const Image = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  display: block;

  margin-right: 15px;
`

export const ProductName = styled(Link)`
  font-size: 1.1rem;

  :hover {
    font-weight: 500;
    border-bottom: 1px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
  }
`

export const Controls = styled.div`
  margin-left: auto;
  padding-left: 10px;
  display: flex;
  align-items: center;

  button {
    text-transform: uppercase;
  }
`
