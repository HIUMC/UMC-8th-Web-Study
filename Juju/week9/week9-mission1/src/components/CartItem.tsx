import { useDispatch } from "../hooks/useCustomRedux";
import { decrease, increase, removeItem } from "../slices/cartSlice";
import type { Lp } from "../types/cart";

interface CartItemProps {
  lp: Lp;
}

const CartItem = ({ lp }: CartItemProps) => {
  const dispatch = useDispatch();

  const handleIncreaseCount = () => {
    dispatch(increase({ id: lp.id }));
  };

  const handleDecreaseCount = () => {

    if (lp.amount === 1) {
      dispatch(removeItem({ id: lp.id }));
      return;
    }

    dispatch(decrease({ id: lp.id }));
  };

  return (
    <div className="flex p-4 border-b border-gray-200">
      <img
        src={lp.img}
        alt={`${lp.title}의 앨범 이미지`}
        className="w-40 h-40 object-cover rounded mr-4"
      />
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-semibold">{lp.title}</h3>
          <p className="text-md font-regular text-gray-600">{lp.singer}</p>
        </div>
        <p className="text-xl font-regular text-sky-400">{lp.price} 원</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={handleDecreaseCount}
          className="px-3 py-1 bg-gray-200 text-gray-800 rounded-l hover:bg-gray-400 cursor-pointer"
        >
          -
        </button>
        <span className="px-4 py-[3px] border-y border-gray-200">
          {lp.amount}
        </span>
        <button
          onClick={handleIncreaseCount}
          className="px-3 py-1 bg-gray-200 text-gray-800 rounded-r hover:bg-gray-400 cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;