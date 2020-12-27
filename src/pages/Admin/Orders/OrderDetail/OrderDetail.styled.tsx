import styled from 'styled-components'

export const Wrapper = styled.div``

export const Row = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px;
  font-size: 1.1rem;

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

  button {
    margin-left: auto;
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
