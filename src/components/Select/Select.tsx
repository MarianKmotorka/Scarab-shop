import { forwardRef, SelectHTMLAttributes } from 'react'
import { Error, StyledSelect, Wrapper } from './Select.styled'

export interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  selectOptions: { key: string; value: string }[]
  name?: string
  label: string
  error?: string
}

const Select = forwardRef<HTMLSelectElement, ISelectProps>(
  ({ selectOptions, name, error, label }, forwardRef) => {
    return (
      <Wrapper>
        <label htmlFor={name}>{label}</label>

        <StyledSelect ref={forwardRef} name={name}>
          {selectOptions.map(o => (
            <option key={o.key} value={o.key}>
              {o.value}
            </option>
          ))}
        </StyledSelect>

        {error && <Error>{error}</Error>}
      </Wrapper>
    )
  }
)

export default Select
