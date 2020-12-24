import { Route, Switch } from 'react-router-dom'

import Bugs from '../Bugs/Bugs'
import Cart from '../Cart/Cart'
import Home from '../Home/Home'
import NotFoundPage from '../NotFoundPage'
import Butterflies from '../Butterflies/Butterflies'
import ProductDetail from '../ProductDetail/ProductDetail'

const Routes = () => (
  <Switch>
    <Route path='/butterflies' exact component={Butterflies} />
    <Route path='/bugs' exact component={Bugs} />
    <Route path='/products/:productId' exact component={ProductDetail} />
    <Route path='/cart' exact component={Cart} />
    <Route path='/' exact component={Home} />
    <Route path='/' component={NotFoundPage} />
  </Switch>
)

export default Routes
