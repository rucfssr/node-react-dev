import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import Routes from './Routes'
import history from './Shared/history'
import './generated.css'
import './style.css'
import { AuthProvider } from './context/AuthenticationContext'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
