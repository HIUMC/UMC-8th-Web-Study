import { useAppSelector, useAppDispatch } from '../hooks';
import { closeModal } from '../slices/modalSlice';
import { clearCart } from '../slices/cartSlice';

const Modal = () => {
  const { isOpen, modalType } = useAppSelector(state => state.modal);
  const dispatch = useAppDispatch();

  console.log('Modal state:', { isOpen, modalType }); // 디버깅용

  const handleCloseModal = () => {
    console.log('🖱️ [USER ACTION] Modal close button clicked');
    dispatch(closeModal());
  };

  const handleConfirmClearCart = () => {
    console.log('🖱️ [USER ACTION] Confirm clear cart button clicked');
    console.log('⚠️ About to clear entire cart');
    dispatch(clearCart());
    dispatch(closeModal());
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl transform transition-all duration-300 scale-100">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            장바구니 비우기
          </h2>
          <p className="text-gray-600 mb-8 text-sm leading-relaxed">
            모든 상품이 삭제됩니다.<br />
            정말 진행하시겠습니까?
          </p>
          
          <div className="flex space-x-3">
            <button
              onClick={handleCloseModal}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all duration-200 text-sm"
            >
              취소
            </button>
            <button
              onClick={handleConfirmClearCart}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-red-500/25"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
