// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { store } from './features/store.js'
import { Provider } from 'react-redux'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
