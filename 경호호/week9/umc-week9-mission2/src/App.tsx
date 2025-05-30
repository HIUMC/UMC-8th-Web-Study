import Navbar from './components/Navbar';
import CartList from './components/CartList';
import Modal from './components/Modal';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="py-8">
        <CartList />
      </div>
      <Modal />
    </div>
  );
}

export default App;
