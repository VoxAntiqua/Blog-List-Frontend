import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NotificationProvider } from './contexts/NotificationContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </NotificationProvider>
)

// Time spent: 11 hrs
