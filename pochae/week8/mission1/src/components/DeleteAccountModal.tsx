interface DeleteAccountModalProps {
    onConfirm: () => void;
    onCancle: () => void;
}

const DeleteAccountModal = ({ onConfirm, onCancle }: DeleteAccountModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-gray-700 text-white p-8 rounded-lg w-90 text-center shadow-xl">
        
        {/* x 버튼 */}
        <div className="flex justify-end">
          <button
            onClick={onCancle}
            className="hover:cursor-pointer font-bold"
          >
            X
          </button>
        </div>

        <h2 className="text-lg font-semibold mb-4 p-3">정말 탈퇴하시겠습니까?</h2>
        {/* <img onClick={setShowDeleteModal}/> */}



        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-gray-400 text-black rounded hover:scale-90 cursor-pointer"
          >
            예
          </button>
          
          <button
            onClick={onCancle}
            className="px-4 py-2 bg-pink-500 text-white rounded hover:scale-90 cursor-pointer"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccountModal
