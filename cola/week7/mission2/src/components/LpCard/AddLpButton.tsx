import { useState } from 'react';
import AddLpModal from './AddLpModal';

const AddLpButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button
        onClick={openModal}
        className="fixed text-4xl bottom-4 right-4 z-10 w-20 h-20 rounded-full cursor-pointer bg-pink-500"
      >
        +
      </button>
      <AddLpModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default AddLpButton;
