import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/app.jsx'
import State from './state'

const state = new State()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App state={ state } />
  </StrictMode>,
)
