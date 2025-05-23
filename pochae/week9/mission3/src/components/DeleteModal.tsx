import { useDispatch } from "../hooks/useCustomRedux"
import { clearCart } from "../slices/cartSlice";
import { hideModal } from "../slices/modalSlice";

const DeleteModal = () => {
    const dispatch = useDispatch();

    const handleConfirm = () => {
        dispatch(clearCart());
        dispatch(hideModal());
    };
    const handleCancle = () => {
        dispatch(hideModal());
    };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <p className='mb-4 font-semibold'>정말 삭제하시겠습니까?</p>
        <div className='flex justify-center gap-4'>
            <button 
                onClick={handleCancle}
                className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer'>아니요</button>
            <button 
                onClick={handleConfirm}
                className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer'>예</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
