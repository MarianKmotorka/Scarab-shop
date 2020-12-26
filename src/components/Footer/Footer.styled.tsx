import styled from 'styled-components'

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.black3};
  height: 250px;
  color: white;
  padding: 20px 0 30px;
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
  border: 2px solid ${({ theme }) => theme.white};
  background-color: ${({ theme, selected }) => (selected ? theme.white : theme.black3)};
  color: ${({ theme, selected }) => (selected ? theme.black3 : theme.white)};
`
