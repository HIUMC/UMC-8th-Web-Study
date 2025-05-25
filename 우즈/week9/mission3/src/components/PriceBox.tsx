import { useCartInfo } from "../hooks/useCartStore";
import { useModalStore } from "../hooks/useModalStore";
import Modal from "./Modal";

const PriceBox = () => {
  const { total } = useCartInfo(); // Zustand에서 가져옴
  const isOpen = useModalStore((state) => state.isOpen); // Zustand 모달 상태
  const offModal = useModalStore((state) => state.offModal); // 모달 닫기 액션

  const handleClearCart = () => {
    // clearCart는 Modal에서 호출되므로 여기에선 안 써도 됨
  };

  const handleInitializeCart = () => {
    useModalStore.getState().onModal(); // 모달 열기
  };

  return (
    <div className="p-12 flex justify-between items-center">
      <button
        onClick={handleInitializeCart}
        className="bg-blue-900 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:scale-103 transition-all cursor-pointer"
      >
        장바구니 초기화
      </button>

      <div className="p-12 flex justify-end text-lg font-bold text-gray-700">
        총 가격: {total}원
      </div>

      {isOpen && <Modal />}
    </div>
  );
};

export default PriceBox;
