import './App.css'
import { ReactNode } from 'react'

interface AppProps {
  children?: ReactNode;
}

function App({ children }: AppProps) {
  return (
    <div className="app">
      {children}
    </div>
  )
}

export default App
