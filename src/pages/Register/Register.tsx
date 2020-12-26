import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Button from '../../components/Button/Button'
import { projectAuth } from '../../firebase/config'
import { Container } from '../../components/Container'
import { createUser } from '../../services/UserService'
import HookFormInput from '../../components/HookForm/HookFormInput'
import { useApiError } from '../../contextProviders/ApiErrorProvider'
import HookForm, { IHookFormProps } from '../../components/HookForm/HookForm'

import { firebaseErrorToFieldError } from './utils'
import { FormTitle, Wrapper } from './Register.styled'

export interface IRegisterFormData {
  name: string
  email: string
  password: string
}

// TODO: VERIFY EMAIL ADDRESS
const Register = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const { setError } = useApiError()

  const handleRegister: IHookFormProps<IRegisterFormData>['handleSubmit'] = async ({
    name,
    email,
    password,
  }) => {
    try {
      // Note: needs to be chained with ".then()" otherwise page refresh is needed to see user logged in
      return await projectAuth
        .createUserWithEmailAndPassword(email.trim(), password)
        .then(
          async ({ user }) => await createUser({ name, email, id: user!.uid }, setError)
        )
        .then(() => history.replace('/'))
    } catch (err) {
      return [firebaseErrorToFieldError(err)]
    }
  }

  return (
    <Container>
      <Wrapper>
        <HookForm<IRegisterFormData> handleSubmit={handleRegister}>
          {({ submitting }) => (
            <>
              <FormTitle>{t('scarabeus.register')}</FormTitle>

              <HookFormInput
                name='name'
                label={t('scarabeus.name')}
                options={{
                  minLength: {
                    value: 3,
                    message: t('scarabeus.validation.minChars', { min: 3 }),
                  },
                  required: t('scarabeus.validation.required') as string,
                }}
              />

              <HookFormInput
                name='email'
                label={t('scarabeus.email')}
                options={{ required: t('scarabeus.validation.required') as string }}
              />

              <HookFormInput
                name='password'
                label={t('scarabeus.password')}
                type='password'
                options={{ required: t('scarabeus.validation.required') as string }}
              />

              <Button type='submit' isLoading={submitting} reversed>
                {t('scarabeus.register')}
              </Button>
            </>
          )}
        </HookForm>
      </Wrapper>
    </Container>
  )
}

export default Register
