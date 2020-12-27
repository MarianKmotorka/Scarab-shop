import { Route, Switch } from 'react-router-dom'

import Bugs from '../../Beetles/Beetles'
import Cart from '../../Cart/Cart'
import Home from '../../Home/Home'
import NotFoundPage from '../../NotFoundPage'
import Butterflies from '../../Butterflies/Butterflies'
import ProductDetail from '../../ProductDetail/ProductDetail'
import NoAuthRoute from './NoAuthRoute'
import Login from '../../Login/Login'
import Register from '../../Register/Register'
import AuthRoute from './AuthRoute'
import Logout from '../../Login/Logout'
import Profile from '../../Profile/Profile'
import Admin from '../../Admin/Admin'

const Routes = () => (
  <Switch>
    <Route path='/bugs' exact component={Bugs} />
    <Route path='/cart' exact component={Cart} />
    <Route path='/butterflies' exact component={Butterflies} />
    <Route path='/products/:productId' exact component={ProductDetail} />

    <NoAuthRoute path='/login' exact component={Login} />
    <NoAuthRoute path='/register' exact component={Register} />

    <AuthRoute path='/logout' exact component={Logout} />
    <AuthRoute path='/profile' exact component={Profile} />
    <AuthRoute path='/admin' exact adminRoute component={Admin} />

    <Route path='/' exact component={Home} />
    <Route path='/' component={NotFoundPage} />
  </Switch>
)

export default Routes
