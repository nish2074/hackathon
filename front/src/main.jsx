import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';import React from 'react';
import App from './App.jsx'
import { AuthContextProvider } from './pages/context/authcontext.jsx'
createRoot(document.getElementById('root')).render(

  <AuthContextProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </AuthContextProvider>
)
