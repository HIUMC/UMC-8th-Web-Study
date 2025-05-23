import { useDispatch } from "../hooks/useCustomRedux";
import { decrement, increment, removeItem } from "../slices/cartSlices";
import type { Lp } from "../types/cart";

interface CartItemProps {
  lp: Lp;
}
const CartItem = ({ lp }: CartItemProps) => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment({ id: lp.id }));
  };

  const handleDecrement = () => {
    if (lp.amount === 1) {
      dispatch(removeItem({ id: lp.id }));
    }
    dispatch(decrement({ id: lp.id }));
  };
  return (
    <div className="flex items-center p-4 border-b border-gray-200">
      <img
        src={lp.img}
        alt={`${lp.title}의 LP 이미지`}
        className="justify-center w-20 h-20 object-cover rounded mr-4"
      />
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{lp.title}</h3>
        <p className="text-sm text-gray-500">{lp.singer}</p>
        <p className="text-sm font-bold text-gray-700">{lp.price} 원</p>
      </div>
      <div className="flex items-center ">
        <button
          onClick={handleDecrement}
          className="px-3  py-1 bg-gray-300 text-gray-800 rounded-l hover:bg-gray-400 cursor-pointer"
        >
          -
        </button>
        <span className="px-3 py-[3px] border-y border-gray-300 ">
          {lp.amount}
        </span>
        <button
          onClick={handleIncrement}
          className="px-3  py-1 bg-gray-300 text-gray-800 rounded-r hover:bg-gray-400 cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
