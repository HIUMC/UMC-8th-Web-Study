import { FaShoppingCart } from 'react-icons/fa';
import { useAppSelector } from '../hooks';

const Navbar = () => {
  const { amount } = useAppSelector(state => state.cart);

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex-shrink-0 cursor-pointer"
            onClick={() => window.location.href = '/'}
          >
            <h1 className="text-xl font-bold">UMC PlayList</h1>
          </div>
          <div className="flex items-center space-x-2">
            <FaShoppingCart className="text-2xl" />
            <div className="bg-red-500 text-white rounded-full px-2 py-1 text-sm font-bold min-w-[24px] text-center">
              {amount}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
