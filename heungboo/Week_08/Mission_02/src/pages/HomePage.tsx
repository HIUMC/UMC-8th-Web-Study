import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import { PAGINATION_ORDER } from "../enums/commons";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  // const { data, isPending, isError } = useGetLpList({ search, limit: 50 });
  const debounceValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);
  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(5, debounceValue, order);

  // ref 는 useInView에서 제공하는 ref로, 이 ref가 연결된 DOM 요소가 화면에 보일 때 inView가 true로 변경됩니다.
  // inView는 ref가 연결된 DOM 요소가 화면에 보일 때 true로 변경됩니다.

  // inView 가 ture 가 될 때 fetchNextPage()를 호출하여 다음 페이지를 가져옵니다.
  const { ref, inView } = useInView({
    // 화면에 노출되는 정도
    threshold: 0,
  });

  useEffect(() => {
    // inView가 true일 때 fetchNextPage()를 호출하여 다음 페이지를 가져옵니다.
    // isFetching이 false이고 hasNextPage가 true일 때만 fetchNextPage()를 호출합니다.
    if (inView) {
      if (!isFetching && hasNextPage) {
        fetchNextPage();
      }
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage, order]);

  if (isError) {
    return <div className={"mt-20"}>Error...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-end mb-4">
        <div className="flex border border-gray-300 rounded-md overflow-hidden">
          <button
            onClick={() => setOrder(PAGINATION_ORDER.asc)}
            className={`px-4 py-2 ${
              order === PAGINATION_ORDER.asc
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            오래된순
          </button>
          <button
            onClick={() => setOrder(PAGINATION_ORDER.desc)}
            className={`px-4 py-2 ${
              order === PAGINATION_ORDER.desc
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            최신순
          </button>
        </div>
      </div>
      <input
        className="border p-4 rounded-sm mb-6 "
        placeholder="검색어를 입력하세요."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div
        className={
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        }
      >
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
    </div>
  );
};

export default HomePage;
