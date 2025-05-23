import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../slices/modalSlice'; //  추가

const PriceBox = () => {
  const { total } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const handleInitializeCart = () => {
    dispatch(openModal()); //  모달 띄우기
  };

  return (
    <div className='p-12 flex justify-between'>
      <div>
        <button
          onClick={handleInitializeCart}
          className='border p-4 rounded-md cursor-pointer'
        >
          장바구니 초기화
        </button>
      </div>
      <div>총 가격: {total}원</div>
    </div>
  );
};

export default PriceBox;

