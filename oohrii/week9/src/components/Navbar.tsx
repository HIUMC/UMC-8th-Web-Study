import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const total = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.amount, 0)
  );

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-semibold">Ohtani Ahn</h1>
      <div className="flex items-center">
        <FaShoppingCart className="text-2xl" />
        <span className="ml-2">{total}</span>
      </div>
    </div>
  );
};

export default Navbar;