import Routes from './Routes/Routes'
import ErrorPage from '../ErrorPage'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { useApiError } from '../../contextProviders/ApiErrorProvider'

import { GlobalStyles } from './App.styled'

const App = () => {
  const { error, removeError } = useApiError()

  return (
    <>
      <GlobalStyles />

      <Navbar />

      {!error && <Routes />}

      {error && <ErrorPage error={error} removeError={removeError} />}

      <Footer />
    </>
  )
}

export default App
