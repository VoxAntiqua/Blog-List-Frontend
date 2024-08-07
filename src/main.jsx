import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store.js'
import { BrowserRouter as Router } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)

// Time spent: 15 hrs
