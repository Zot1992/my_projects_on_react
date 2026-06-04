import { createRoot } from 'react-dom/client'
import { ItemsProvider } from './context/ItemsContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <ItemsProvider>
    <App />
  </ItemsProvider>
)
