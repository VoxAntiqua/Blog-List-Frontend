import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import './index.css'
import { NotificationProvider } from './contexts/NotificationContext.jsx'
import { UserProvider } from './contexts/UserContext.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <NotificationProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </NotificationProvider>
    </UserProvider>
  </QueryClientProvider>
)

// Time spent: 11 hrs
