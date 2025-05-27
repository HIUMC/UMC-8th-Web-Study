import useModalStore from './useModalStore'
import useCartStore from '../cart/useCartStore'

export default function ConfirmationModal() {
  // 개별구독!!
  const isOpen = useModalStore((state) => state.isOpen);
  const message = useModalStore((state) => state.message);
  const confirmAction = useModalStore((state) => state.confirmAction);
  const closeModal = useModalStore((state) => state.closeModal);

  const { clearCart } = useCartStore();

  if (!isOpen) return null

  const handleConfirm = () => {
    if (confirmAction === 'cart/clearCart') {clearCart();}
    // 모달이 다른 경우 여기에다가 하나 씩 추가하면 됨!!
   closeModal();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button onClick={handleConfirm} className="px-4 py-2 bg-blue-600 text-white rounded">
            네
          </button>
          
          <button onClick={() => closeModal()} className="px-4 py-2 bg-gray-200 rounded">
            아니요
          </button>
          
        </div>
      </div>
    </div>
  )
}
