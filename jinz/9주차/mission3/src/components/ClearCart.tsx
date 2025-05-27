import { useCartStore } from "../store/useCartStore";
import { useModalStore } from "../store/useModalStore";


function ClearCart () {

    const clearCart = useCartStore((state) => state.clearCart);
    const calculateTotals = useCartStore((state) => state.calculateTotals);
    const openModal = useModalStore((state)=> state.openModal);
    const closeModal = useModalStore((state)=> state.closeModal);
    const modal = useModalStore((state)=> state.isOpen);

    return (
        <>
            <button 
                onClick={()=>{
                    openModal();
                }}
                className='border p-4 rounded'>Remove</button>
            {modal && (
                <div className="fixed inset-0 bg-balck bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2>정말 삭제하시겠습니까?</h2>
                        <button 
                            className="bg-gray-300 p-2 rounded"
                            onClick={()=>closeModal()}>아니요</button>
                        <button 
                            className="bg-red-500 text-white p-2 rounded"
                            onClick={()=>{
                                clearCart();
                                calculateTotals();
                                closeModal();
                            }}>네</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default ClearCart;