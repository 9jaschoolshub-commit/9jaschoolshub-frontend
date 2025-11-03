import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import ErrorBoundary from './components/global/ErrorBoundary'
import FallbackUI from './components/fallback/FallbackUI'
import './index.css'
import App from './App'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

createRoot(document.getElementById('root')).render(
  <ErrorBoundary fallback={<FallbackUI />}>
    {/*  <ClerkProvider publishableKey={PUBLISHABLE_KEY}> */}
    <App />
    {/*   </ClerkProvider> */}
  </ErrorBoundary>
)
