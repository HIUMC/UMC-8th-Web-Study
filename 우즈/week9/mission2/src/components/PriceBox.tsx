import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";
import { onModal } from "../slices/modalSlice";
import Modal from "./Modal";

const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleInitializeCart = () => {
    dispatch(onModal());
  };

  return (
    <div className="p-12 flex justify-between items-center">
      <button
        onClick={handleInitializeCart}
        className="bg-blue-900 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:scale-103 transition-all cursor-pointer"
      >
        장바구니 초기화
      </button>

      <div className="p-12 flex justify-end text-lg font-bold text-gray-700">
        총 가격: {total}원
      </div>

      {isOpen && <Modal onClearCart={handleClearCart} />}
    </div>
  );
};

export default PriceBox;
