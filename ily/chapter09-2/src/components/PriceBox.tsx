import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlices";
import { toggleModal } from "../slices/modalSlice";

const PriceBox = () => {
  const { isOpen } = useSelector((state) => state.modal);
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleInitialization = () => {
    dispatch(clearCart());
  };

  const handleModal = () => {
    dispatch(toggleModal());
  };

  return (
    <div className="-p-12 flex justify-between space-between items-center">
      <button
        className="border p-4 rounded-md cursor-pointer"
        onClick={handleModal}
      >
        empty cartbox
      </button>
      <div className="p-8 flex justify-end">총 가격: {total}원</div>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50"
          onClick={handleModal}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <p className="text-lg font-semibold mb-4">정말 삭제하시겠습니까?</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300"
                onClick={handleModal}
              >
                아니요
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => {
                  handleInitialization();
                }}
              >
                네
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceBox;
