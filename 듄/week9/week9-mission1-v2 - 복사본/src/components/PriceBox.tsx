import { useCartInfo } from '../hooks/useCartStore';
import { useState } from 'react';
import Modal from './Modal';

const PriceBox = () => {
  const { total } = useCartInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="px-95 py-10 flex justify-end">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="ml-4 px-4 py-2 bg-[#91B671] text-white rounded hover:bg-[#759465]"
        >
          장바구니 비우기
        </button>
        <div className="ml-4 py-2 px-4">총 가격: {total}원</div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default PriceBox;
