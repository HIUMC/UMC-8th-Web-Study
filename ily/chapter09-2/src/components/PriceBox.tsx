import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { toggleModal } from "../slices/modalSlice";
import ModalBox from "./ModalBox";

const PriceBox = () => {
  const { isOpen } = useSelector((state) => state.modal);
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

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

      {isOpen && <ModalBox />}
    </div>
  );
};

export default PriceBox;
