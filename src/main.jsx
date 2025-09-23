import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'
import {Routes, Route} from 'react-router-dom'

import NotFound from './components/pages/notfound/NotFound.jsx'
import Signup from './components/pages/signup/Signup.jsx'
import Login from './components/pages/login/Login.jsx'

import AuthProvider from './components/auth/authContext/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/CompSciety'> {/* make sure to remove this para sa vercel */}
        <AuthProvider>
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
