import { InputHTMLAttributes, forwardRef } from 'react'
import { Error, StyledInput, Wrapper } from './Input.styled'

export interface IInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string
  error?: string
  className?: string
  colorInverted?: boolean
  onChange?: (value: string) => void
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ className, name, label, error, onChange, ...rest }, forwardRef) => {
    return (
      <Wrapper className={className} {...rest}>
        <label htmlFor={name}>{label}</label>

        <StyledInput
          {...rest}
          name={name}
          onChange={e => onChange && onChange(e.target.value)}
          ref={forwardRef}
        />

        {error && <Error>{error}</Error>}
      </Wrapper>
    )
  }
)

export default Input
