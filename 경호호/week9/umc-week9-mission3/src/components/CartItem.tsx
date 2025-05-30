import type { CartItemProps } from '../types';
import { usePlaylistStore } from '../store/playlistStore';

const CartItem = ({ lp }: CartItemProps) => {
  const { increase, decrease, removeItem } = usePlaylistStore();

  const handleIncrease = () => {
    console.log('🖱️ [USER ACTION] Increase button clicked (Zustand)');
    console.log('💿 Item:', { id: lp.id, title: lp.title, currentAmount: lp.amount });
    increase(lp.id);
  };

  const handleDecrease = () => {
    console.log('🖱️ [USER ACTION] Decrease button clicked (Zustand)');
    console.log('💿 Item:', { id: lp.id, title: lp.title, currentAmount: lp.amount });
    
    if (lp.amount === 1) {
      console.log('⚠️ Item will be removed (amount = 1)');
      removeItem(lp.id);
      return;
    }
    decrease(lp.id);
  };

  return (
    <div className="flex items-center bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-200">
      <img
        src={lp.img}
        alt={lp.title}
        className="w-20 h-20 object-cover rounded-xl mr-6 shadow-sm"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{lp.title}</h3>
        <p className="text-gray-500 text-sm mb-2">{lp.singer}</p>
        <p className="text-blue-600 font-bold text-lg">₩{lp.price.toLocaleString()}</p>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleDecrease}
          className="bg-gray-100 hover:bg-gray-200 text-gray-600 w-10 h-10 rounded-xl flex items-center justify-center font-semibold transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <span className="text-lg font-semibold w-8 text-center text-gray-700">{lp.amount}</span>
        <button
          onClick={handleIncrease}
          className="bg-blue-50 hover:bg-blue-100 text-blue-600 w-10 h-10 rounded-xl flex items-center justify-center font-semibold transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
