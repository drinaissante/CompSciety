import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import {Routes, Route} from 'react-router-dom'

import App from "@pages/home/App.jsx"
import NotFound from '@pages/notfound/NotFound.jsx'
import Signup from '@pages/signup/Signup.jsx'
import Login from '@pages/login/Login.jsx'

import AuthProvider from '@components/auth/authContext/AuthProvider.jsx'

import VerifyEmail from '@pages/verifyemail/VerifyEmail.jsx'
import ActionHandler from '@pages/action/ActionHandler.jsx'
import ResetPassword from '@pages/resetpw/ResetPassword.jsx'
import AboutPage from '@pages/about/AboutPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/CompSciety'> {/* make sure to remove this para sa vercel*/}
        <AuthProvider>
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify" element={<VerifyEmail />} />
              <Route path="resetpassword" element={<ResetPassword /> } />
              <Route path="/action" element={<ActionHandler />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
