interface DeleteConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center rounded-2xl bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-md shadow-md text-center">
        <p className="text-lg font-semibold mb-6">정말 삭제하시겠습니까?</p>
        <div className="flex justify-end gap-4 rounded-2xl">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            아니요
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
