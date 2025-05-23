import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlices";

const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleInitialization = () => {
    dispatch(clearCart());
  };

  return (
    <div className="-p-12 flex justify-between space-between items-center">
      <button
        className="border p-4 rounded-md cursor-pointer"
        onClick={handleInitialization}
      >
        empty cartbox
      </button>
      <div className="p-8 flex justify-end">총 가격: {total}원</div>
    </div>
  );
};

export default PriceBox;
