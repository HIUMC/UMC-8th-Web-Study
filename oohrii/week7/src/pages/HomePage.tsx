import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import LpCard from "../components/LpCard/LpCard";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
    error
  } = useGetInfiniteLpList(10, search, PAGINATION_ORDER.ASC);
  const {ref, inView} = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      console.log("Fetching next page...");
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  useEffect(() => {
    console.log("Current data:", lps);
    console.log("Is pending:", isPending);
    console.log("Is error:", isError);
    console.log("Error:", error);
  }, [lps, isPending, isError, error]);

  if (isError) {
    return <div className="mt-20 text-center text-red-500">Error: {error?.message || '알 수 없는 오류가 발생했습니다.'}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <input 
          type="text"
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          placeholder="검색어를 입력하세요..."
          className="w-full p-2 border rounded-lg"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isPending && <LpCardSkeletonList count={20} />}
        {lps?.pages?.map((page, pageIndex) => 
          page.data.data.map((lp) => (
            <LpCard key={`${lp.id}-${pageIndex}`} lp={lp} />
          ))
        )}
        {isFetching && <LpCardSkeletonList count={4} />}
        <div ref={ref} className="h-2" />
      </div>
    </div>
  );
};

export default HomePage;