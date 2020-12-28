import styled from 'styled-components'

export const Row = styled.div`
  padding: 25px 10px;
  display: flex;
  align-items: center;

  :nth-of-type(odd) {
    background: ${({ theme }) => theme.white2};
  }

  label {
    font-weight: 500;
    margin-right: 10px;
  }
`
