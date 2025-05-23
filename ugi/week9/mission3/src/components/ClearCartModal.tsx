import { useModalStore } from "../hooks/useModalStore";
import { useCartActions } from "../hooks/useCartStore";

const ClearCartModal = () => {
  const { isOpen, closeModal } = useModalStore();
  const { clearCart } = useCartActions();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="mb-4 text-lg font-semibold">정말 삭제하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
          >
            아니요
          </button>
          <button
            onClick={() => {
              clearCart();
              closeModal();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClearCartModal;
