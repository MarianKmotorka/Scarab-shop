import { useState } from 'react'
import {
  useForm,
  FormProvider,
  FieldValues,
  FieldName,
  DefaultValues,
} from 'react-hook-form'

interface IChildrenProps {
  submitting: boolean
}

export interface ISubmitError<TFormData> {
  field: FieldName<TFormData>
  error: string
}

export interface IHookFormProps<TFormData = any> {
  defaultValues?: DefaultValues<TFormData>
  children: (props: IChildrenProps) => JSX.Element
  handleSubmit: (data: TFormData) => Promise<ISubmitError<TFormData>[] | void>
}

const HookForm = <TFormData extends FieldValues>({
  defaultValues,
  children,
  handleSubmit,
}: IHookFormProps<TFormData>) => {
  const methods = useForm<TFormData>({ defaultValues })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmitted = methods.handleSubmit(async data => {
    setSubmitting(true)
    const errorArray = await handleSubmit(data)
    setSubmitting(false)

    if (!errorArray) return

    errorArray.forEach(x => methods.setError(x.field, { message: x.error }))
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmitted}>{children({ submitting })}</form>
    </FormProvider>
  )
}

export default HookForm
