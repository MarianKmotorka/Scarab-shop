import Navbar from '../../components/Navbar/Navbar'
import { GlobalStyles } from './App.styled'

const App = () => {
  return (
    <div>
      <GlobalStyles />

      <Navbar />
      <div style={{ height: 10000 }}>SHOP</div>
    </div>
  )
}

export default App
