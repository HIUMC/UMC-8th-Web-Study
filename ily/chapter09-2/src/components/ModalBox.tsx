import { useDispatch } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlices";
import { toggleModal } from "../slices/modalSlice";

const ModalBox = () => {
  const dispatch = useDispatch();

  const handleInitialization = () => {
    dispatch(clearCart());
  };

  const handleModal = () => {
    console.log("toggleModalbutton");
    dispatch(toggleModal());
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50"
      onClick={handleModal}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg text-center w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-lg font-semibold mb-4">정말 삭제하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 cursor-pointer"
            onClick={handleModal}
          >
            아니요
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer"
            onClick={() => {
              handleInitialization();
            }}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalBox;
