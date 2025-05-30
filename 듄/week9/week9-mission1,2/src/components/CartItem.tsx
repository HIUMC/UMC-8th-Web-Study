import { useAppDispatch } from '../hooks/useCustomRedux';
import { increase, removeItem } from '../slices/cartSlice';
import { decrease } from '../slices/cartSlice';
import { Lp } from '../types/cart';

interface CartItemProps {
  lp: Lp;
}

const CartItem = ({lp}: CartItemProps) => {
  const dispatch = useAppDispatch();
  
  const handleIncreaseCount = () => {
    dispatch(increase({id: lp.id}));
  }
  
  const handleDecreaseCount = () => {
    if(lp.amount === 1) {
      dispatch(removeItem({id: lp.id}));
      return;
    }
    dispatch(decrease({id: lp.id}));
  }
  
 return (
 <div className='flex items-center p-4 border-b border-gray-200 '>
  <img src={lp.img} alt={`${lp.title}의 LP 이미지`} className='w-20 h-20 object-cover rounded mr-4'/>
  <div className='flex-1'>
    <h3 className='text-xl font-semibold'>{lp.title}</h3>
    <p className='text-sm text-gray-600'>{lp.singer}</p>
    <p className='text-sm font-bold text-gray-600'>{lp.price} 원</p>
  </div>

  {/* -, + 버튼 */}
  <div className='flex items-center'>
    <button onClick={handleDecreaseCount} className='w-8 px-3 py-1 bg-[#91B671] text-gray-800 rounded-l hover:bg-[#759465] cursor-pointer'>-</button>
    <span className ='px-3 py-[3px] border-y border-gray-300'>{lp.amount}</span>
    <button onClick={handleIncreaseCount} className='w-8 px-3 py-1 bg-[#91B671] text-gray-800 rounded-r hover:bg-[#759465] cursor-pointer'>+</button>
  </div>
 </div>
 )
};

export default CartItem;