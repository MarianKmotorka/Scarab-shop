import styled from 'styled-components'

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.black};
  height: 250px;
  color: white;
  padding: 35px 0 50px;
`

export const Content = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const LangButton = styled.button<{ selected: boolean }>`
  padding: 10px 15px;
  outline: none;
  border: none;
  cursor: pointer;

  transition: all 0.3s;
  border: 1px solid ${({ theme }) => theme.white};
  background-color: ${({ theme, selected }) => (selected ? theme.white : theme.black)};
  color: ${({ theme, selected }) => (selected ? theme.black : theme.white)};
`

export const InstaLink = styled.a`
  color: ${({ theme }) => theme.white};
  margin-right: 20px;

  svg {
    font-size: 2.7rem;
    display: block;
    transition: all 0.2s;

    :hover {
      color: ${({ theme }) => theme.primary};
      transform: scale(1.1);
    }
  }
`

export const PoliciesLink = styled.a`
  color: ${({ theme }) => theme.white};
  margin-right: 20px;
  font-size: 1.15rem;
  font-weight: 300;

  :hover {
    text-decoration: underline;
  }
`
