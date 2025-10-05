import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, useLocation } from 'react-router-dom'
import {Routes, Route} from 'react-router-dom'

import Home from "@pages/home/Home.jsx"
import NotFound from '@pages/notfound/NotFound.jsx'
import Signup from '@pages/signup/Signup.jsx'
import Login from '@pages/login/Login.jsx'

import AuthProvider from '@components/auth/authContext/AuthProvider.jsx'
import NavBar from '@components/NavBar.jsx'

import VerifyEmail from '@pages/verifyemail/VerifyEmail.jsx'
import ActionHandler from '@pages/action/ActionHandler.jsx'
import ResetPassword from '@pages/resetpw/ResetPassword.jsx'
import AboutPage from '@pages/about/AboutPage.jsx'

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/CompSciety'> {/* make sure to remove this para sa vercel basename='/CompSciety'*/}
        <AuthProvider>
          <ScrollToTop />

          <NavBar />
          
          <Routes>
              <Route path="/" element={<Home />} />
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
