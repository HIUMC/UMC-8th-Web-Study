import { useDispatch, useSelector } from "react-redux";
import type { RootState } from '../store/index';
import { calculateTotals, decrease, increase, removeItem } from "../store/cartSlice";
import { useEffect } from "react";
import ClearCart from "./ClearCart";

function CartItem() {
    const cart = useSelector((state: RootState) => state.cart.cartItems);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(calculateTotals());
    }, [cart, dispatch])


    return(
        <div className="flex flex-col w-3/4 mx-auto mt-10">
           {cart.map((itme)=>{
                return(
                    <div className="flex item-center" key={itme.id}>
                        <div className="flex w-full items-center p-4 border-b gap-4 border-gray-200">
                        <img src={itme.img} className="rounded-lg w-30 h-30" />
                        <div className="grid gird-cols ">
                            <div className="text-lg font-bold">{itme.title}</div>
                            <div className="text-sm text-gray-500">{itme.singer}</div>
                            <div className="text-sm font-bold">${itme.price}</div>
                        </div>
                        </div>
                        <div className="flex items-center gap-2 font-bold">
                            <button
                             onClick={()=>{
                                dispatch(increase(itme.id))
                                console.log('increase', itme.id, itme.amount)
                             }}>+</button>
                            <input type="number"
                                value={itme.amount}
                                className="w-10 text-center"
                                readOnly></input>
                            <button
                                onClick={()=>{
                                    if(itme.amount === 1){
                                        dispatch(removeItem(itme.id))
                                    }
                                    else dispatch(decrease(itme.id))
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