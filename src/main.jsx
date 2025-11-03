import { createRoot } from 'react-dom/client'
import ErrorBoundary from './components/global/ErrorBoundary'
import FallbackUI from './components/fallback/FallbackUI'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <ErrorBoundary fallback={<FallbackUI />}>
    <App />
  </ErrorBoundary>
)
