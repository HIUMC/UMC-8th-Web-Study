import { useState } from "react";
import LpModal from "../pages/modalPages/LpModal";

const FloatingButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="fixed bottom-10 right-10 w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition"
      >
        +
      </button>
      {isModalOpen && <LpModal onClose={toggleModal} />}
    </>
  );
};

export default FloatingButton;
