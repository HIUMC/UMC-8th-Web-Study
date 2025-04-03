import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // 항상 index.css를 불러온다
import App from './App.tsx'

/* root. 항상 최상단에 있음. main.tsx는 App.tsx의 뿌리를 박아주는 역할 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
