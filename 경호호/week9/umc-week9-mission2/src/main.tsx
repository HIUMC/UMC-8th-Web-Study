import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import './index.css'
import App from './App.tsx'

// 앱 시작 로깅
console.group('🚀 [APP] Mission2 - Redux Application Starting');
console.log('📅 Started at:', new Date().toLocaleString());
console.log('🏪 Initial Redux Store State:', store.getState());
console.log('📦 Store Configuration:', {
  middleware: 'Redux Toolkit + Custom Action Logger',
  stateManagement: 'Redux'
});
console.groupEnd();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
