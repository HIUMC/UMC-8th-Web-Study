import { useCartActions } from "../hooks/useCartStore";
import type { Lp } from "../types/cart";

interface CartItemProps {
  lp: Lp;
}

const CartItem = ({ lp }: CartItemProps) => {
  const { increase, decrease, removeItem } = useCartActions();

  const handleIncreaseCount = () => {
    increase(lp.id);
  };

  const handleDecreaseCount = () => {
    // 1보다 작아진다면, 장바구니 목록에서 자동으로 제거
    if (lp.amount === 1) {
      removeItem(lp.id);
      return;
    }
    decrease(lp.id);
  };

  return (
    <div className="flex items-center p-4 mt-8 mb-6 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 max-w-3xl mx-auto">
      <div className="w-20 h-20 overflow-hidden rounded-lg mr-6 group">
        <img
          src={lp.img}
          alt={`${lp.title}의 LP 이미지`}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 space-y-1">
        <h3 className="text-[18px] font-bold text-gray-900">{lp.title}</h3>
        <p className="text-sm text-gray-500">{lp.singer}</p>
        <p className="text-base font-semibold text-gray-700">
          {lp.price.toLocaleString()} 원
        </p>
      </div>
      <div className="flex items-center">
        <button
          onClick={handleDecreaseCount}
          className="px-3 py-1 bg-gray-300 text-gray-800 rounded-l hover:bg-gray-400 cursor-pointer"
        >
          -
        </button>
        <span className="px-4 py-[3px] border-y border-gray-300">
          {lp.amount}
        </span>
        <button
          onClick={handleIncreaseCount}
          className="px-3 py-1 bg-gray-300 text-gray-800 rounded-r hover:bg-gray-400 cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
