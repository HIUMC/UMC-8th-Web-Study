import { useAppDispatch, useAppSelector } from "../hooks/useCustomRedux";
import { openModal } from "../slices/modalSlice";

const PriceBox = () => {
  const dispatch = useAppDispatch();
  const { total } = useAppSelector((state) => state.cart);

  const handleClearCart = () => {
    dispatch(openModal());
  };

  return (
    <div className="px-95 py-10 flex justify-end">
      <button 
        onClick={handleClearCart}
        className="ml-4 px-4 py-2 bg-[#91B671] text-white rounded hover:bg-[#759465]"
      >
        장바구니 비우기
      </button>
      <div className="ml-4 py-2 px-4">총 가격: {total}원</div>
    </div>
  );
};

export default PriceBox;
