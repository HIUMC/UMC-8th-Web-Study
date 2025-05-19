import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import { PAGINATION_ORDER } from "../enums/commons";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const HomePage = () => {
  const [search, setSearch] = useState("");
  // const { data, isPending, isError } = useGetLpList({ search, limit: 50 });
  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(5, search, PAGINATION_ORDER.desc);

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
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) {
    return <div className={"mt-20"}>Error...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
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
