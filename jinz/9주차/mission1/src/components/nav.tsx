import type { RootState } from "../store/index";
import { useSelector } from "react-redux";

function Nav() {
    
    const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
    
    return(
        <>
            <nav className="width-full h-20 bg-gray-500 flex flex-row justify-between items-center px-10">
                <div className="text-white text-2xl font-bold">hi...</div>
                <div className="text-white text-xl flex gap-4">
                    <div className="text-white text-xl">🛒 {totalAmount}</div>
                    <div className="text-white text-md">Total: ${totalPrice}</div>
                </div>
            </nav>
        </>
    )
}

export default Nav;