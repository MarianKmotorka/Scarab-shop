import Routes from './Routes/Routes'
import ErrorPage from '../ErrorPage'
import Navbar from '../../components/Navbar/Navbar'
import { useApiError } from '../../contextProviders/ApiErrorProvider'

import { GlobalStyles } from './App.styled'
import Footer from '../../components/Footer/Footer'

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
