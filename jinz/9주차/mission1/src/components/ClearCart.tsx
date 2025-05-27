
import { calculateTotals, clearCart } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../store/modalSlice";
import type { RootState } from "../store/index";

function ClearCart () {
    
    const modal = useSelector((state: RootState) => state.modal.isOpen)
    const dispatch = useDispatch();

    return (
        <>
            <button 
                onClick={()=>{
                    dispatch(openModal());
                }}
                className='border p-4 rounded'>Remove</button>
            {modal && (
                <div className="fixed inset-0 bg-balck bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2>정말 삭제하시겠습니까?</h2>
                        <button 
                            className="bg-gray-300 p-2 rounded"
                            onClick={()=>dispatch(closeModal())}>아니요</button>
                        <button 
                            className="bg-red-500 text-white p-2 rounded"
                            onClick={()=>{
                                dispatch(clearCart());
                                dispatch(calculateTotals());
                                dispatch(closeModal());
                            }}>네</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default ClearCart;