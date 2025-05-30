import { useCartActions } from '../hooks/useCartStore';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const { clearCart } = useCartActions();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">장바구니 비우기</h2>
        <p className="mb-4">정말로 장바구니를 비우시겠습니까?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            아니요
          </button>
          <button
            onClick={() => {
              clearCart();
              onClose();
            }}
            className="px-4 py-2 bg-[#91B671] text-white rounded hover:bg-[#759465]"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal; 