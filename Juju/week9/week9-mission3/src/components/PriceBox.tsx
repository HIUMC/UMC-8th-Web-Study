import { useCartInfo } from "../hooks/useCartStore";
import { useModalStore } from "../hooks/useModalStore";
import Modal from "./Modal";

const PriceBox = () => {
  const { total } = useCartInfo();
  const isOpen = useModalStore((state) => state.isOpen);
  const offModal = useModalStore((state) => state.offModal);

  const handleInitionalizeCart = () => {
    offModal(); // 모달 닫기
    useModalStore.getState().onModal(); // 모달 열기
  };

  return (
    <div className="flex justify-between items-center mt-12 px-8 py-6 bg-gray-50 text-gray-800">
      <button
        onClick={handleInitionalizeCart}
        className="text-gray-400 font-semibold rounded-md cursor-pointer"
      >
        장바구니 초기화
      </button>
      <div className="text-2xl font-regular text-sky-500">총 가격 : {total}원</div>


      {isOpen && <Modal />}
    </div>
  );
};

export default PriceBox;