import { useDispatch } from 'react-redux';
import { closeModal } from '../store/modalSlice';

interface Props {
  onConfirm?: () => void;
}

const ConfirmModal = ({ onConfirm }: Props) => {
  const dispatch = useDispatch();

  const handleNo = () => {
    dispatch(closeModal());
  };

  const handleYes = () => {
    if (onConfirm) onConfirm();
    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow text-center">
        <div className="mb-4 text-lg font-semibold">정말 삭제하시겠습니까?</div>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={handleNo}
          >아니요</button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleYes}
          >네</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal; 