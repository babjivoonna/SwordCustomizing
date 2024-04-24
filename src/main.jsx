import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Context from './Context/Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="270080415861-q1gl0b16ot0hklei1hb14r7e0cs4h201.apps.googleusercontent.com">
    <BrowserRouter>
    <Context>

    <App />
    </Context>
    </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
