import { Route, Switch } from 'react-router-dom'

import Cart from '../../Cart/Cart'
import Home from '../../Home/Home'
import AuthRoute from './AuthRoute'
import Login from '../../Login/Login'
import Admin from '../../Admin/Admin'
import NoAuthRoute from './NoAuthRoute'
import Logout from '../../Login/Logout'
import Bugs from '../../Beetles/Beetles'
import Profile from '../../Profile/Profile'
import NotFoundPage from '../../NotFoundPage'
import Register from '../../Register/Register'
import Orders from '../../Admin/Orders/Orders'
import Butterflies from '../../Butterflies/Butterflies'
import ProductDetail from '../../ProductDetail/ProductDetail'
import EditProduct from '../../Admin/Product/Edit/EditProduct'
import CreateProduct from '../../Admin/Product/Create/CreateProduct'
import OrderDetail from '../../Admin/Orders/OrderDetail/OrderDetail'

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
    <AuthRoute path='/admin/orders' exact adminRoute component={Orders} />
    <AuthRoute path='/admin/orders/:orderId' exact adminRoute component={OrderDetail} />
    <AuthRoute path='/admin/products/create' exact adminRoute component={CreateProduct} />
    <AuthRoute
      path='/admin/products/:productId/edit'
      exact
      adminRoute
      component={EditProduct}
    />

    <Route path='/' exact component={Home} />
    <Route path='/' component={NotFoundPage} />
  </Switch>
)

export default Routes
