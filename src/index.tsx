import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './pages/App/App'
import { theme } from './utils/theme'
import Loader from './components/Loader/Loader'
import CartProvider from './contextProviders/CartProvider'
import AuthProvider from './contextProviders/AuthProvider'
import ApiErrorProvider from './contextProviders/ApiErrorProvider'
import './i18n/i18nSetup'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <ApiErrorProvider>
          <AuthProvider>
            <CartProvider>
              <Suspense fallback={<Loader />}>
                <App />
              </Suspense>
            </CartProvider>
          </AuthProvider>
        </ApiErrorProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
