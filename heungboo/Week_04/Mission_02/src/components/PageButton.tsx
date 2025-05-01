import React from "react";

interface PageButtonProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const PageButton: React.FC<PageButtonProps> = ({ page, setPage }) => {
  return (
    <>
      <button
        className="
      bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
      hover:bg-green-500 transration-all duration-200 disabled:bg-gray-300
      cursor-pointer disabled:cursor-not-allowed"
        disabled={page === 1}
        onClick={(): void => {
          setPage((prev): number => prev - 1);
        }}
      >{`<`}</button>

      <span>{page} Page</span>

      <button
        className="
      bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
      hover:bg-green-500 transration-all duration-200 disabled:bg-gray-300
      cursor-pointer "
        // disabled={page === 3}
        onClick={() => {
          setPage((prev): number => prev + 1);
        }}
      >{`>`}</button>
    </>
  );
};
