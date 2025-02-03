import { scan } from 'react-scan'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/app.jsx'

if (import.meta.env.MODE == 'development') {
  scan({
    enabled: true,
    log: true
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
