import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 앱 시작 로깅
console.group('🚀 [APP] Mission3 - Zustand Application Starting');
console.log('📅 Started at:', new Date().toLocaleString());
console.log('📦 Store Configuration:', {
  stateManagement: 'Zustand',
  persistence: 'None',
  middleware: 'Custom Logging'
});
console.groupEnd();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
