import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { SM } from '../../utils/theme'
import { useWindowSize } from '../../hooks'
import { firebaseErrorToFieldError } from './utils'
import Button from '../../components/Button/Button'
import { projectAuth } from '../../firebase/config'
import { Container } from '../../components/Container'
import HookFormInput from '../../components/HookForm/HookFormInput'
import HookForm, { IHookFormProps } from '../../components/HookForm/HookForm'

import bg from '../../images/green-bug-min.jpg'
import { Bg, FormTitle, Wrapper } from './Login.styled'
export interface ILoginFormData {
  email: string
  password: string
}

const Login = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const { width } = useWindowSize()
  const returnUrl = history.location?.state && (history.location.state as any).returnUrl

  const isSmall = width <= SM

  const handleLogin: IHookFormProps<ILoginFormData>['handleSubmit'] = async ({
    email,
    password,
  }) => {
    try {
      await projectAuth.signInWithEmailAndPassword(email.trim(), password)
      return history.replace(returnUrl || '/')
    } catch (err) {
      return [firebaseErrorToFieldError(err)]
    }
  }

  return (
    <Wrapper>
      <Container>
        <HookForm<ILoginFormData> handleSubmit={handleLogin}>
          {({ submitting }) => (
            <>
              <FormTitle>{t('scarabeus.login')}</FormTitle>

              <HookFormInput
                name='email'
                colorInverted={isSmall}
                label={t('scarabeus.email')}
              />
              <HookFormInput
                name='password'
                label={t('scarabeus.password')}
                type='password'
                colorInverted={isSmall}
              />

              <Button
                type='submit'
                isLoading={submitting}
                colorInverted={isSmall}
                reversed={isSmall}
              >
                {t('scarabeus.login')}
              </Button>
            </>
          )}
        </HookForm>
      </Container>

      <Bg src={bg} />
    </Wrapper>
  )
}

export default Login
