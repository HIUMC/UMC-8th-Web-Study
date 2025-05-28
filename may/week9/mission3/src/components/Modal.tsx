
import { useDispatch } from "react-redux";
import { closeModal } from "../slices/modalSlice";
import { clearCart } from "../slices/cartSlice";
import "../App.css"; // 필요시 스타일 조정

const Modal = () => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(closeModal());
  };

  const handleConfirm = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <h4>정말 삭제하시겠습니까?</h4>
        <div className="modal-buttons">
          <button onClick={handleCancel} className="btn cancel-btn">아니요</button>
          <button onClick={handleConfirm} className="btn confirm-btn">네</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
