import { useSelector, useDispatch } from "../hooks/useCustomRedux";
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

  const handleInitionalizeCart = () => {
    dispatch(onModal());
  };

  return (
    <div className="flex justify-between items-center mt-12 px-8 py-6 bg-gray-50 text-gray-800">
      <button
        onClick={handleInitionalizeCart}
        className="text-gray-400 font-semibold rounded-md cursor-pointer"
      >
        장바구니 초기화
      </button>
      <div className="text-2xl font-regular text-sky-500">총 가격 : {total}원</div>

      {/* Button to open the modal for confirmation */}
      {isOpen && <Modal onClearCart={handleClearCart} />}
    </div>
  );
};

export default PriceBox;