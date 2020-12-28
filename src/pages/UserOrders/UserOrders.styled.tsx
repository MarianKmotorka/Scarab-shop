import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { MD } from '../../utils/theme'

export const Wrapper = styled.div``

export const OrderLink = styled(Link)`
  padding: 25px 30px;
  border-top: solid 1px ${({ theme }) => theme.black};
  display: flex;
  align-items: center;
  transition: all 0.2s;

  :last-child {
    border-bottom: solid 1px ${({ theme }) => theme.black};
    margin-bottom: 60px;
  }

  svg {
    font-size: 1.1rem;
    margin-left: auto;
  }

  :hover {
    background: ${({ theme }) => theme.white2};
    padding-left: 40px;
  }

  @media screen and (max-width: ${MD}px) {
    padding: 25px 5px;
  }
`

export const NewBadge = styled.div`
  padding: 5px 8px;
  border: solid 1px ${({ theme }) => theme.black};
  border-radius: 100px;
  font-size: 0.75rem;
  margin-left: 10px;
`
