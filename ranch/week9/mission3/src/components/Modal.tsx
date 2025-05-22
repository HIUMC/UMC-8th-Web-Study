// 모달 UI, 버튼(네/아니요) 처리할 것. 
import { useDispatch } from "../hooks/useCustomRedux";
import { closeModal } from "../slices/modalSlice";

interface ModalProps {
  onClearCart: () => void;
}

const Modal = ({ onClearCart }: ModalProps) => {
  const dispatch = useDispatch();

  const handleNo = () => {
    dispatch(closeModal());
  };

  const handleYes = () => {
    onClearCart();
    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
        <p className="mb-6 text-lg font-semibold">정말 삭제하시겠습니까?</p>
        <div className="flex gap-4">
          <button
            onClick={handleYes}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 cursor-pointer"
          >
            네
          </button>
          <button
            onClick={handleNo}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 cursor-pointer"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;