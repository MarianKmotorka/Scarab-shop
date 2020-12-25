import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './pages/App/App'
import { theme } from './utils/theme'
import CartProvider from './contextProviders/CartProvider'
import ApiErrorProvider from './contextProviders/ApiErrorProvider'
import AuthProvider from './contextProviders/AuthProvider'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <ApiErrorProvider>
          <AuthProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </AuthProvider>
        </ApiErrorProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
