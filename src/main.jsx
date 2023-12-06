import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
   <Auth0Provider
       domain="dev-i8rvpc6d1yoh1ppu.us.auth0.com"
       clientId="WHGTEDJ8XiyJg37RSVzcMJm594WcPoTW"
       authorizationParams={{
         redirect_uri: window.location.origin
       }}
   >
    <App />
</Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
