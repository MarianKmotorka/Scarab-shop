import styled from 'styled-components'

export const Wrapper = styled.div<{ colorInverted?: boolean }>`
  label {
    margin-bottom: 5px;
    display: block;
    color: ${({ theme, colorInverted }) => (colorInverted ? theme.white : theme.black3)};
    ::after {
      content: ':';
    }
  }
`

export const StyledInput = styled.input<{ colorInverted?: boolean }>`
  width: 100%;
  padding: 5px;
  border: 2px solid
    ${({ theme, colorInverted }) => (colorInverted ? theme.white : theme.black3)};

  color: ${({ theme, colorInverted }) => (colorInverted ? theme.white : theme.black3)};

  background-color: ${({ theme, colorInverted }) =>
    colorInverted ? theme.black3 : theme.white};

  ${({ theme, disabled }) => disabled && `background-color: ${theme.white3}`};

  outline: none;
  font-size: inherit;
`

export const Error = styled.p`
  color: ${({ theme }) => theme.red};
  font-size: 0.75rem;
  margin-top: 3px;
`
