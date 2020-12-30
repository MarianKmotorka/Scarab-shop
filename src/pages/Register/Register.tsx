import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { SM } from '../../utils/theme'
import { useWindowSize } from '../../hooks'
import Button from '../../components/Button/Button'
import { projectAuth } from '../../firebase/config'
import { Container } from '../../components/Container'
import { createUser } from '../../services/UserService'
import HookFormInput from '../../components/HookForm/HookFormInput'
import { useApiError } from '../../contextProviders/ApiErrorProvider'
import HookForm, { IHookFormProps } from '../../components/HookForm/HookForm'

import { firebaseErrorToFieldError } from './utils'
import { Bg, FormTitle, Wrapper } from './Register.styled'
import bg from '../../images/bug-on-white.jpg'

export interface IRegisterFormData {
  name: string
  email: string
  password: string
}

// TODO: VERIFY EMAIL ADDRESS
const Register = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const { width } = useWindowSize()
  const { setError } = useApiError()

  const isSmall = width <= SM

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
    <Wrapper>
      <Container>
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
                colorInverted={isSmall}
              />

              <HookFormInput
                name='email'
                label={t('scarabeus.email')}
                options={{ required: t('scarabeus.validation.required') as string }}
                colorInverted={isSmall}
              />

              <HookFormInput
                name='password'
                label={t('scarabeus.password')}
                type='password'
                options={{ required: t('scarabeus.validation.required') as string }}
                colorInverted={isSmall}
              />

              <Button
                type='submit'
                isLoading={submitting}
                colorInverted
                reversed={isSmall}
              >
                {t('scarabeus.register')}
              </Button>
            </>
          )}
        </HookForm>
      </Container>

      <Bg src={bg} />
    </Wrapper>
  )
}

export default Register
