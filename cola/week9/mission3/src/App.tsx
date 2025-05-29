import Navbar from './components/Navbar';
import CartList from './components/CartList';
import { Provider } from 'react-redux';
import store from './store/store';
import TotalPrice from './components/TotalPrice';

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <CartList />
      <TotalPrice />
    </Provider>
  );
}

export default App;
