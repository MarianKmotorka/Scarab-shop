import Routes from './Routes'
import ErrorPage from '../ErrorPage'
import Navbar from '../../components/Navbar/Navbar'
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
    </>
  )
}

export default App
