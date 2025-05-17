import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LPCard/LPCard";
import LpCardSkeletonList from "../components/LPCard/LPCardSkeletonList";
import Modal from "react-modal";

Modal.setAppElement("#root");

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(5, search, PAGINATION_ORDER.dsec);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) return <div className="mt-20">Error...</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 cursor-pointer"
      >
        +
      </button>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-4 py-1 mb-4 flex-grow mr-2"
        placeholder="검색할 내용을 입력하세요"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isPending && <LpCardSkeletonList count={20} />}
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={ref} className="h-2"></div>

      {/* 모달 */}
      <Modal
        
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="글 작성 모달"
        className="bg-white p-6 rounded shadow-md max-w-lg mx-auto mt-24 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
      >
        <h2 className="text-xl font-bold mb-4">글 작성</h2>
        <textarea
          placeholder="내용을 입력하세요..."
          className="w-full h-40 border border-gray-300 p-2 mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-300 text-black px-4 py-2 rounded cursor-pointer"
            
          >
            닫기
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;
