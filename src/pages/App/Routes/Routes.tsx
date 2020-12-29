import { Route, Switch } from 'react-router-dom'

import Cart from '../../Cart/Cart'
import Home from '../../Home/Home'
import AuthRoute from './AuthRoute'
import Login from '../../Login/Login'
import Admin from '../../Admin/Admin'
import NoAuthRoute from './NoAuthRoute'
import Logout from '../../Login/Logout'
import Bugs from '../../Products/Products'
import Profile from '../../Profile/Profile'
import NotFoundPage from '../../NotFoundPage'
import Register from '../../Register/Register'
import Orders from '../../Admin/Orders/Orders'
import UserOrders from '../../UserOrders/UsersOrders'
import ProductDetail from '../../ProductDetail/ProductDetail'
import OrderDetail from '../../Admin/Orders/OrderDetail/OrderDetail'
import EditProduct from '../../Admin/CreateOrEditProduct/CreateOrEditProduct'
import UserOrderDetail from '../../UserOrders/UserOrderDetail/UserOrderDetail'
import ProductStatistics from '../../Admin/Statisctics/ProductStatisctics'

const Routes = () => (
  <Switch>
    <Route path='/cart' exact component={Cart} />
    <Route path='/products' exact component={Bugs} />
    <Route path='/products/:productId' exact component={ProductDetail} />

    <NoAuthRoute path='/login' exact component={Login} />
    <NoAuthRoute path='/register' exact component={Register} />

    <AuthRoute path='/logout' exact component={Logout} />
    <AuthRoute path='/profile' exact component={Profile} />
    <AuthRoute path='/orders' exact component={UserOrders} />
    <AuthRoute path='/orders/:orderId' exact component={UserOrderDetail} />

    <AuthRoute path='/admin' exact adminRoute component={Admin} />
    <AuthRoute path='/admin/orders' exact adminRoute component={Orders} />
    <AuthRoute path='/admin/statistics' exact adminRoute component={ProductStatistics} />
    <AuthRoute path='/admin/orders/:orderId' exact adminRoute component={OrderDetail} />
    <AuthRoute path='/admin/products/create' exact adminRoute component={EditProduct} />
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
