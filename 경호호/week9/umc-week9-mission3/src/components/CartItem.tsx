import type { CartItemProps } from '../types';
import { usePlaylistStore } from '../store/playlistStore';

const CartItem = ({ lp }: CartItemProps) => {
  const { increase, decrease, removeItem } = usePlaylistStore();

  const handleIncrease = () => {
    increase(lp.id);
  };

  const handleDecrease = () => {
    if (lp.amount === 1) {
      removeItem(lp.id);
      return;
    }
    decrease(lp.id);
  };

  return (
    <div className="flex items-center bg-white shadow-md rounded-lg p-4 mb-4">
      <img
        src={lp.img}
        alt={lp.title}
        className="w-24 h-24 object-cover rounded-md mr-4"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{lp.title}</h3>
        <p className="text-gray-600">{lp.singer}</p>
        <p className="text-blue-600 font-bold">₩ {lp.price.toLocaleString()}원</p>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={handleDecrease}
          className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors"
        >
          -
        </button>
        <span className="text-lg font-semibold w-8 text-center">{lp.amount}</span>
        <button
          onClick={handleIncrease}
          className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
