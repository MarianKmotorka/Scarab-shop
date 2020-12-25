import { RegisterOptions, useFormContext } from 'react-hook-form'
import AutoTextArea, { IAutoTextAreaProps } from '../AutoTextArea/AutoTextArea'

interface IProps extends IAutoTextAreaProps {
  name: string
  options?: RegisterOptions
}

const HookFormTextArea = ({ name, options, ...rest }: IProps) => {
  const { errors, register } = useFormContext()

  return (
    <AutoTextArea
      {...rest}
      name={name}
      error={errors[name]?.message}
      ref={register(options)}
    />
  )
}

export default HookFormTextArea
