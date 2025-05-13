import { PAGINATION_ORDER } from "../enums/common"

interface OrderToggleProps {
    order: PAGINATION_ORDER;
    setOrder: (order: PAGINATION_ORDER) => void;
}

const OrderToggle = ({ order, setOrder}: OrderToggleProps) => {
  return (
    <div className='inline-flex border border-white rounded overflow-hidden text-sm front-medium'>
      <button onClick={()=> setOrder(PAGINATION_ORDER.asc)}
            className={`px-4 py-2 ${order === PAGINATION_ORDER.asc ? "bg-white text-black" : "bg-black text-white"} hover:cursor-pointer`}
        >
        오래된순
      </button>

      <button onClick={()=> setOrder(PAGINATION_ORDER.desc)}
            className={`px-4 py-2 ${order === PAGINATION_ORDER.desc ? "bg-white text-black" : "bg-black text-white"} hover:cursor-pointer`}
        >
        최신순
      </button>
    </div>
  )
}

export default OrderToggle
