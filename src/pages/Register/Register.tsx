import { useHistory } from 'react-router-dom'

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
              <FormTitle>REGISTRUJ SA</FormTitle>

              <HookFormInput name='name' label='Meno' />
              <HookFormInput name='email' label='Email' />
              <HookFormInput name='password' label='Heslo' type='password' />

              <Button type='submit' isLoading={submitting} reversed>
                REGISTROVAŤ SA
              </Button>
            </>
          )}
        </HookForm>
      </Wrapper>
    </Container>
  )
}

export default Register
