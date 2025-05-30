import { useAppSelector, useAppDispatch } from '../hooks';
import { closeModal } from '../slices/modalSlice';
import { clearCart } from '../slices/cartSlice';

const Modal = () => {
  const { isOpen, modalType } = useAppSelector(state => state.modal);
  const dispatch = useAppDispatch();

  console.log('Modal state:', { isOpen, modalType }); // 디버깅용

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleConfirmClearCart = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          정말 삭제하시겠습니까?
        </h2>
        
        <div className="flex space-x-4 mt-6">
          <button
            onClick={handleCloseModal}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            아니요
          </button>
          <button
            onClick={handleConfirmClearCart}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
