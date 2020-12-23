import { FC } from 'react'
import styled from 'styled-components'

export const Wrapper = styled.span`
  position: relative;
  display: inline-block;
`

export const StyledBadge = styled.div`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  border-radius: 50%;
  height: 15px;
  width: 15px;

  position: absolute;
  top: -7px;
  right: -10px;

  display: grid;
  place-items: center;

  span {
    font-size: 0.8rem;
  }
`

interface IProps {
  value: number
}

const Badge: FC<IProps> = ({ value, children }) => (
  <Wrapper>
    {value > 0 && (
      <StyledBadge>
        <span>{value}</span>
      </StyledBadge>
    )}

    {children}
  </Wrapper>
)

export default Badge
