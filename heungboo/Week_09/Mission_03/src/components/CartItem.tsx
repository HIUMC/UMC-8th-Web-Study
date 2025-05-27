import { useCartActions } from "../hooks/useCartStore";
import { Lp } from "../types/cart";

interface CartItemProps {
  lp: Lp;
}

const CartItems = ({ lp }: CartItemProps) => {
  const { increase, decrease, removeItem } = useCartActions();

  const handleIncreaseCount = () => {
    increase(lp.id);
  };

  const handleDecreaseCount = () => {
    // 1보다 작아진다면, 장바구니 목록에서 자동으로 제거
    if (lp.amount === 0) {
      removeItem(lp.id);
      return;
    }
    decrease(lp.id);
  };

  return (
    <>
      <div className="flex items-center p-4 border-b-2 border-gray-300">
        <img
          src={lp.img}
          alt={`${lp.title}의 LP 이미지`}
          className="w-20 h-20 object-cover rounded mr-4"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{lp.title}</h3>
          <p className="text-sm text-gray-600">{lp.singer} </p>
          <p className="text-sm font-bold text-gray-500">{lp.price} 원</p>
        </div>
        <div className="flex justify-center">
          <button
            className="px-3 py-1 bg-gray-300 text-gray-800 rounded-l hover:bg-gray-400 cursor-pointer"
            onClick={handleDecreaseCount}
          >
            -
          </button>
          <span className="px-4 py-1 border-y border-gray-300">
            {lp.amount}
          </span>
          <button
            className="px-3 py-1 bg-gray-300 text-gray-800 rounded-r hover:bg-gray-400 cursor-pointer"
            onClick={handleIncreaseCount}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};
export default CartItems;
