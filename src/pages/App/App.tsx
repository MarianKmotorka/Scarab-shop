import { Route, Switch } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Home from '../Home/Home'
import { GlobalStyles } from './App.styled'

const App = () => {
  return (
    <div style={{ height: '100vh' }}>
      <GlobalStyles />

      <Navbar />

      <Switch>
        <Route path='/' component={Home} />
      </Switch>
    </div>
  )
}

export default App
