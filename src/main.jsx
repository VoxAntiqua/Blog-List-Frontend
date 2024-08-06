import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import './index.css'
import { NotificationProvider } from './contexts/NotificationContext.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </NotificationProvider>
  </QueryClientProvider>
)

// Time spent: 11 hrs
