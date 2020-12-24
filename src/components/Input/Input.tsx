import { InputHTMLAttributes } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  label {
    margin-bottom: 5px;
    display: block;

    ::after {
      content: ':';
    }
  }
`

const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
  border: 2px solid ${({ theme }) => theme.black};
  outline: none;
  font-size: inherit;
`

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string
  width?: string
  onChange?: (value: string) => void
  className?: string
}

const Input = ({ label, name, onChange, className, ...rest }: IProps) => {
  return (
    <Wrapper className={className}>
      <label htmlFor={name}>{label}</label>
      <StyledInput {...rest} onChange={e => onChange && onChange(e.target.value)} />
    </Wrapper>
  )
}

export default Input
