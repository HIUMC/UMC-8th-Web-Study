import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/commons";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);
  const {
    data:lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError
  } = useGetInfiniteLpList(8, debouncedValue, PAGINATION_ORDER.desc);

  // ref -> 특정한 html 요소를 감시할 수 있음
  // inView -> 감시하고 있는 요소가 화면에 보이는지 여부: 화면에 보이면 true, 아니면 false
  const {ref, inView} = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage) {
        fetchNextPage();
      }
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError)
    return <h1 className="mt-20 p-4">Error...</h1>;

  return (
    <div className="p-4">
      <input
          className="border-1 border-gray-300 rounded-md px-4 py-2 mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="검색어를 입력하세요"
      />
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isPending && <LpCardSkeletonList count={20} />}
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) =>
            <LpCard key={lp.id} lp={lp} />
          )}
          {isFetching && <div ref={ref}>
            <LpCardSkeletonList count={5} />
          </div>
          }
      </div>
      <div ref={ref} className="h-2"></div>
    </div>
  );
};

export default HomePage;