import { Provider } from 'react-redux';
import store from './store/store';
import Navbar from './components/Navbar';
import CartList from './components/CartList';
import PriceBox from './components/PriceBox';
import ClearCartModal from './components/ClearCartModal';

function App() {
  return (
    <Provider store={store}>
      <>
        <Navbar />
        <CartList />
        <PriceBox />
        <ClearCartModal />
      </>
    </Provider>
  );
}

export default App;
