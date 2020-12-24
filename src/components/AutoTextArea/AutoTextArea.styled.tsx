import styled from 'styled-components'

export const Wrapper = styled.div`
  label {
    margin-bottom: 5px;
    display: block;

    ::after {
      content: ':';
    }
  }
`

export const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 5px;
  border: 2px solid ${({ theme }) => theme.black};
  outline: none;
  font-size: inherit;
  resize: none;

  ::-webkit-scrollbar {
    display: none;
  }
`
