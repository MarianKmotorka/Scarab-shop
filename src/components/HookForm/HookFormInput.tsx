import { RegisterOptions, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Input, { IInputProps } from '../Input/Input'

interface IProps extends IInputProps {
  name: string
  options?: RegisterOptions
}

const HookFormInput = ({ name, options, ...rest }: IProps) => {
  const { t } = useTranslation()
  const { errors, register } = useFormContext()

  return (
    <Input
      {...rest}
      name={name}
      error={t(errors[name]?.message)}
      ref={register(options)}
    />
  )
}

export default HookFormInput
