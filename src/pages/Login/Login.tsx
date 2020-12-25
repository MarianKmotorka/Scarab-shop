import { useHistory } from 'react-router-dom'

import Button from '../../components/Button/Button'
import { projectAuth } from '../../firebase/config'
import { Container } from '../../components/Container'
import HookFormInput from '../../components/HookForm/HookFormInput'
import HookForm, { IHookFormProps } from '../../components/HookForm/HookForm'

import { firebaseErrorToFieldError } from './utils'
import { FormTitle, Wrapper } from './Login.styled'

export interface ILoginFormData {
  email: string
  password: string
}

const Login = () => {
  const history = useHistory()
  const returnUrl = history.location?.state && (history.location.state as any).returnUrl

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
    <Container>
      <Wrapper>
        <HookForm<ILoginFormData> handleSubmit={handleLogin}>
          {({ submitting }) => (
            <>
              <FormTitle>PRIHLÁS SA</FormTitle>

              <HookFormInput name='email' label='Email' />
              <HookFormInput name='password' label='Heslo' type='password' />

              <Button type='submit' isLoading={submitting} reversed>
                PRIHLÁSIŤ SA
              </Button>
            </>
          )}
        </HookForm>
      </Wrapper>
    </Container>
  )
}

export default Login
