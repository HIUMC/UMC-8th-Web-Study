import React from "react";

interface SortButtonsProps {
  sortOrder: string;
  setSortOrder: (order: string) => void;
}

const SortButtons: React.FC<SortButtonsProps> = ({
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="flex space-x-4 mb-5">
      <button
        onClick={() => setSortOrder("newest")}
        className={`px-4 py-2 rounded ${
          sortOrder === "newest"
            ? "bg-blue-500 text-white"
            : "bg-white text-black border"
        }`}
      >
        최신순
      </button>
      <button
        onClick={() => setSortOrder("oldest")}
        className={`px-4 py-2 rounded ${
          sortOrder === "oldest"
            ? "bg-blue-500 text-white"
            : "bg-white text-black border"
        }`}
      >
        오래된순
      </button>
    </div>
  );
};

export default SortButtons;
