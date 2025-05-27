import { Provider } from 'react-redux'
import './App.css'
import CartPage from './pages/cartPage'
import store from './store/index'

function App() {

  return (
    <>
      <Provider store={store}>
          <CartPage />
      </Provider>
    </>
  )
}

export default App
