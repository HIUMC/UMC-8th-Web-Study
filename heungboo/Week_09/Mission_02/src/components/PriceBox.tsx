import { useSelector, useDispatch } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";
import { closeModal, openModal } from "../slices/modalSlice";
import DeleteConfirmationModal from "./modals/DeleteConfirmationModal";

const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleClearCart = (): void => {
    dispatch(clearCart()); // 여기 clearCart 는 cartSlice 건데.. modalSlice로 바꾸면 리셋이 안됨
    dispatch(closeModal());
  };

  return (
    <div className="p-12 flex justify-between">
      <button
        onClick={() => dispatch(openModal())}
        className="border p-4 rounded-md cursor-pointer"
      >
        전체 삭제
      </button>
      <div>총 가격 : {total}원</div>

      {isOpen && (
        <DeleteConfirmationModal
          onConfirm={handleClearCart}
          onCancel={() => dispatch(closeModal())}
        />
      )}
    </div>
  );
};
export default PriceBox;
