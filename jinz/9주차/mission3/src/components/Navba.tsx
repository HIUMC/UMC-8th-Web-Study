import { useCartStore } from "../store/useCartStore";

function Nav() {
    const totalAmount = useCartStore((state)=> state.totalAmount)
    
    return(
        <>
            <nav className="width-full h-20 bg-gray-500 flex flex-row justify-between items-center px-10">
                <div className="text-white text-2xl font-bold">hi...</div>
                <div className="text-white text-xl flex gap-4">
                    <div className="text-white text-xl">🛒 {totalAmount}</div>
                </div>
            </nav>
        </>
    )
}

export default Nav;