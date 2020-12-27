import { RegisterOptions, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Select, { ISelectProps } from '../Select/Select'

interface IProps extends ISelectProps {
  name: string
  options?: RegisterOptions
}

const HookFormSelect = ({ name, options, ...rest }: IProps) => {
  const { t } = useTranslation()
  const { errors, register } = useFormContext()

  return (
    <Select
      {...rest}
      name={name}
      error={t(errors[name]?.message)}
      ref={register(options)}
    />
  )
}

export default HookFormSelect
