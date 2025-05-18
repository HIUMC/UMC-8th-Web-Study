import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useQueryClient } from "@tanstack/react-query";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import CreateLpModal from "../components/Modal/CreateLpModal";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debouncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);
  const queryClient = useQueryClient();

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(5, debouncedValue, PAGINATION_ORDER.dsec);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) {
    return <div className="mt-20">에러가 발생했습니다 😢</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* 검색창 */}
      <input
        className="border p-4 rounded-sm w-full mb-4"
        placeholder="검색어를 입력하세요."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* LP 생성 버튼 */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-pink-600 text-white px-4 py-2 rounded-full"
        >
          새 LP 추가
        </button>
      </div>

      {/* LP 카드 리스트 */}
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

      {/* 무한스크롤용 관찰 지점 */}
      <div ref={ref} className="h-2"></div>

      {/* LP 생성 모달 */}
      {isModalOpen && (
        <CreateLpModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ["lps"] }); // LP 목록 새로고침
            setIsModalOpen(false); // 모달 닫기
          }}
        />
      )}
    </div>
  );
};

export default HomePage;
