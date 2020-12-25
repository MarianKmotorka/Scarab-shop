import { Route, Redirect } from 'react-router-dom'
import { RouteProps, useHistory } from 'react-router'
import { useAuth } from '../../../contextProviders/AuthProvider'

interface IProps extends RouteProps {
  component: any
  adminRoute?: boolean
}

const AuthRoute = ({ component: Component, location, adminRoute, ...rest }: IProps) => {
  const auth = useAuth()
  const history = useHistory()

  const redirect = (
    <Redirect
      to={{
        pathname: '/login',
        state: { returnUrl: `${location?.pathname}${location?.search}` || '' },
      }}
    />
  )

  if (!auth.isLoggedIn) return redirect

  const isAdminCompliant = auth.currentUser.isAdmin || !adminRoute

  if (!isAdminCompliant) {
    history.replace('/login')
    return <></>
  }

  return <Route {...rest} render={props => <Component {...props} />} />
}

export default AuthRoute
