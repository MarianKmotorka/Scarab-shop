import { Route, Switch } from 'react-router-dom'

import Bugs from '../Bugs/Bugs'
import Home from '../Home/Home'
import Navbar from '../../components/Navbar/Navbar'
import Butterflies from '../Butterflies/Butterflies'

import { GlobalStyles } from './App.styled'

const App = () => {
  return (
    <>
      <GlobalStyles />

      <Navbar />

      <Switch>
        <Route path='/butterflies' exact component={Butterflies} />
        <Route path='/bugs' exact component={Bugs} />
        <Route path='/' component={Home} />
      </Switch>
    </>
  )
}

export default App
