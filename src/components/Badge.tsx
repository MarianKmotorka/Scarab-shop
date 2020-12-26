import { FC } from 'react'
import styled from 'styled-components'

export const Wrapper = styled.span`
  position: relative;
  display: inline-block;
`

export const StyledBadge = styled.div`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  border-radius: 999px;
  border: solid 1px ${({ theme }) => theme.black};
  padding: 0 4px;
  min-width: 17px;
  height: 17px;

  position: absolute;
  top: -7px;
  left: 75%;

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
