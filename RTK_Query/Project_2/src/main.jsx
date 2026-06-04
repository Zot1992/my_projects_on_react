import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { IdProvider } from './context/idContext.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <IdProvider>
      <App />
    </IdProvider>
  </Provider>
)
