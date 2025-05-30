import { FaShoppingCart } from 'react-icons/fa';
import { useAppSelector } from '../hooks';

const Navbar = () => {
  const { amount } = useAppSelector(state => state.cart);

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex-shrink-0 cursor-pointer"
            onClick={() => window.location.href = '/'}
          >
            <h1 className="text-2xl font-bold text-gray-900">UMC PlayList</h1>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <FaShoppingCart className="text-2xl text-gray-600" />
              {amount > 0 && (
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
                  {amount}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
