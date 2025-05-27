import { useDispatch, useSelector } from '../hooks/useCustomRedux';
import { clearCart } from '../slices/cartSlice';
import { openModal, closeModal } from '../slices/modalSlice';

const TotalPrice = () => {
  const { total } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    if (!isOpen) {
      dispatch(openModal());
    } else {
      dispatch(clearCart());
      dispatch(closeModal());
    }
  };
  return (
    <div className="flex p-12 w-full gap-10 items-center justify-center">
      <button onClick={handleClearCart} className="border p-4 rounded-md cursor-pointer">
        장바구니 초기화
      </button>
      <div>총 가격: {total}원</div>
      {isOpen && (
        <div className="fixed inset-0 z-10">
          {/* Blur backdrop */}
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          {/* Modal content */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 shadow-lg w-96">
              <p className="text-lg font-semibold mb-4">장바구니를 모두 삭제하시겠습니까?</p>
              <div className="flex gap-4">
                <button
                  className="p-4 bg-red-500 text-white cursor-pointer rounded hover:bg-red-600 flex-1"
                  onClick={handleClearCart}
                >
                  네
                </button>
                <button
                  className="p-4 bg-gray-500 text-white cursor-pointer rounded hover:bg-gray-600 flex-1"
                  onClick={() => dispatch(closeModal())}
                >
                  아니오
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalPrice;
