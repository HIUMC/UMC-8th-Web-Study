import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";
import { openModal } from "../slices/modalSlice";
import Modal from "./Modal";

const PriceBox = () =>{
    const {total} = useSelector((state) =>state.cart); 
    const { isOpen } = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    // 모달에서 "네" 클릭 시 실행될 함수
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleInitializeCart = () =>{
        dispatch(openModal());
    }; 

    
    return (
    <div className="p-12 flex justify-between items-center">
        <button
            onClick={handleInitializeCart}
            className="bg-blue-950 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-800 hover:scale-105 transition-all duration-200 flex items-center gap-2 cursor-pointer"
        >
            🛒 장바구니 초기화
        </button>
        <div className='p-12 flex justify-end text-lg font-bold text-gray-700'>
            총 가격: {total}원
        </div>
         {isOpen && <Modal onClearCart={handleClearCart} />}
    </div>
)
}

export default PriceBox;
