import { useEffect, useState, useCallback } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/searchDebounceDelay";
import useThrottle from "../hooks/useThrottle";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);
  
  const {data: lps, isFetching, hasNextPage, isPending, fetchNextPage, isError}
  = useGetInfiniteLpList(12, debouncedValue, PAGINATION_ORDER.DESC);
  
  const{ref, inView} = useInView({
    threshold: 0,
  });

  // 스크롤 이벤트 발생 여부를 추적하는 상태
  const [shouldFetch, setShouldFetch] = useState(false);
  
  // shouldFetch 상태를 스로틀링
  const throttledShouldFetch = useThrottle(shouldFetch, 2000);

  useEffect(() => {
    if(inView) {
      setShouldFetch(true);
    }
  }, [inView]);

  useEffect(() => {
    if(throttledShouldFetch && !isFetching && hasNextPage) {
      fetchNextPage();
      setShouldFetch(false);
    }
  }, [throttledShouldFetch, isFetching, hasNextPage, fetchNextPage]);

  if(isPending) return <div>Loading...</div>;
  if(isError) return <div>Error</div>;

  console.log(lps);

  return (
    <div className = "container mw-auto px-4 py-6">
      <input
      className={"border border-gray-300 rounded-md p-2 mb-4"} 
      placeholder="검색어를 입력하세요."
      value = {search}
      onChange = {(e) => setSearch(e.target.value)} />

      <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}>
        {lps?.pages
        ?.map((page) => page.data.data)
        ?.flat()
        ?.map((lp) => <LpCard key = {lp.id} lp = {lp} /> )}
        {isFetching && <LpCardSkeletonList count = {12} />}
      </div>
      <div ref = {ref} className = "h-2"></div>
    </div>
  );
};

export default HomePage;
