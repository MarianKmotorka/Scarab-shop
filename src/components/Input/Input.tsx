import { InputHTMLAttributes } from 'react'
import styled from 'styled-components'

interface IStyledProps {
  width?: string
}

const Wrapper = styled.div`
  label {
    margin-right: 5px;

    ::after {
      content: ':';
    }
  }
`

const StyledInput = styled.input<IStyledProps>`
  width: ${({ width }) => width || 'auto'};
  padding: 5px;
  border: 2px solid ${({ theme }) => theme.black};
  outline: none;
  font-size: inherit;
`

interface IProps extends IStyledProps, InputHTMLAttributes<HTMLInputElement> {
  label: string
  width?: string
}

const Input = ({ label, name, ...rest }: IProps) => {
  return (
    <Wrapper>
      <label htmlFor={name}>{label}</label>
      <StyledInput {...rest} />
    </Wrapper>
  )
}

export default Input
