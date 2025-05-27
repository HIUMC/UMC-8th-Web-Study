import { useCartActions } from "../hooks/useCartStore";
import { useModalStore } from "../hooks/useModalStore";

const Modal = () => {
  const { clearCart } = useCartActions();
  const offModal = useModalStore((state) => state.offModal);

  const handleOff = () => {
    offModal();
  };

  const handleOn = () => {
    clearCart();
    offModal();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl px-10 py-8 w-[340px] sm:w-[420px] text-center">
        <p className="mb-8 text-lg sm:text-xl text-gray-700 font-semibold">
          장바구니를 초기화하시겠습니까?
        </p>
        <div className="flex justify-center gap-5">
          <button
            onClick={handleOff}
            className="w-24 py-2 rounded-md bg-sky-400 text-white font-bold hover:bg-sky-600 transition-all duration-200"
          >
            아니요
          </button>
          <button
            onClick={handleOn}
            className="w-24 py-2 rounded-md bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition-all duration-200"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;