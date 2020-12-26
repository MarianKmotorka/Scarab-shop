import styled from 'styled-components'

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.black};
  height: 250px;
  color: white;
  padding: 35px 0 50px;
`

export const LangButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const StyledButton = styled.button<{ selected: boolean }>`
  padding: 10px 15px;
  outline: none;
  border: none;
  cursor: pointer;

  transition: all 0.3s;
  border: 1px solid ${({ theme }) => theme.white};
  background-color: ${({ theme, selected }) => (selected ? theme.white : theme.black)};
  color: ${({ theme, selected }) => (selected ? theme.black : theme.white)};
`
