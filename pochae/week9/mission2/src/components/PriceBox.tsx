import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";
import { showModal } from "../slices/modalSlice";
import DeleteModal from "./DeleteModal";
const PriceBox = () => {
  const {total} = useSelector((state) => state.cart);
  const isModalOpen = useSelector((state) => state.modal.isOpen);
  
  const dispatch = useDispatch();

  const handleInitializeCart = () => {
    dispatch(clearCart());
  }

  const handleShowModal = () =>{
    dispatch(showModal());
  }

  return (
    <>
    <div className='p-12 flex justify-between'>
      <button 
        onClick={handleInitializeCart}
        className='border p-4 rounded-md cursor-pointer'>
        장바구니 초기화
      </button>

      <button 
        onClick={handleShowModal}
        className='border p-4 rounded-md cursor-pointer'>
        전체 삭제
      </button>

      <div>총 가격:{total}원</div>
    </div>

    {isModalOpen && <DeleteModal/>}    
    </>
  )
}

export default PriceBox
