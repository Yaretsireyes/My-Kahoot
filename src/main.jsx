import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RoutesKahoot from './routes/RoutesKahoot.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoutesKahoot />
  </StrictMode>,
)
