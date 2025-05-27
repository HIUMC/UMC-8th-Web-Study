import { useCartStore } from "../store/useCartStore";
import ClearCart from "../components/ClearCart";
import { useEffect } from "react";

function CartItem() {
    const increase= useCartStore((state)=> state.increase);
    const decrease = useCartStore((state) => state.decrease);
    const removeItem = useCartStore((state) => state.removeItem);
    const cart = useCartStore((state) => state.cartItems);
    const totalAmount = useCartStore((state) => state.calculateTotals);

    useEffect(() => {
        totalAmount();
    }, [])

    return (
        <div className="flex flex-col w-3/4 mx-auto mt-10">
           {cart.map((itme)=>{
                return(
                    <div className="flex item-center" key={itme.id}>
                        <div className="flex w-full items-center p-4 border-b gap-4 border-gray-200">
                        <img src={itme.img} className="rounded-lg w-30 h-30" />
                        <div className="grid gird-cols ">
                            <div className="text-lg">{itme.title}</div>
                            <div className="text-sm text-gray">{itme.singer}</div>
                            <div className="text-sm text-bold">${itme.price}</div>
                        </div>
                        </div>
                        <div className="flex items-center gap-2 ">
                            <button
                             onClick={()=>{
                                increase(itme.id)
                                console.log('increase', itme.id, itme.amount)
                             }}>+</button>
                            <input type="number"
                                value={itme.amount}
                                className="w-10 text-center"
                                readOnly></input>
                            <button
                                onClick={()=>{
                                    if(itme.amount === 1){
                                        removeItem(itme.id)
                                    }
                                    else decrease(itme.id)
                                }}>
                            -</button>
                        </div>
                    
                    </div>
                    
                        
                )
           })}
           <ClearCart />
        </div>
    )

}

export default CartItem;