import { useDispatch } from "react-redux";
import { useSelector } from "../hooks/useCustomRedux";
import CartItem from "./CartItem";
import Modal from "./Modal"; // 모달 import
import { openModal } from "../slices/modalSlice";

const CartList = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal); // 모달 상태 확인

  const handleClearClick = () => {
    dispatch(openModal());
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {isOpen && <Modal />} {/* 모달이 열려있으면 모달 렌더링 */}

      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>

      {cartItems.length > 0 && (
        <button
          onClick={handleClearClick}
          className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
        >
          전체 삭제
        </button>
      )}
    </div>
  );
};

export default CartList;
