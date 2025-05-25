// Modal.tsx 수정ver (Zustand만 사용)
import { useCartActions } from "../hooks/useCartStore";
import { useModalStore } from "../hooks/useModalStore";

const Modal = () => {
  const { clearCart } = useCartActions();
  const offModal = useModalStore((state) => state.offModal);

  const handleOff = () => {
    offModal(); // 모달 닫기
  };

  const handleOn = () => {
    clearCart(); // 장바구니 비우기
    offModal(); // 모달 닫기
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl px-10 py-8 w-[340px] sm:w-[420px] text-center">
        <p className="mb-8 text-lg sm:text-xl text-gray-700 font-semibold">
          정말 삭제하시겠습니까?
        </p>
        <div className="flex justify-center gap-5">
          <button
            onClick={handleOff}
            className="w-24 py-2 rounded-md bg-gray-300 text-gray-800 font-bold hover:bg-gray-400 transition-all duration-200"
          >
            아니요
          </button>
          <button
            onClick={handleOn}
            className="w-24 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition-all duration-200"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
