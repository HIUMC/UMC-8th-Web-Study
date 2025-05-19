import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../utils/types/enums/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import useDebounce from "../hooks/useDebounce";
import { SERVER_DELAY } from "../constants/delay";

export default function HomePage() {
  //children을npm 설정했으므로 children을 기준으로outlet을 설정해줘야 parents 기준의 children이 제대로 렌더링이 됨.

  // const { data, isPending, isError } = useGetLpList({
  //   search: "",
  //   limit: 50,
  // });

  const [search, setSearch] = useState(""); // Define the search variable
  const debouncedValue = useDebounce(search, SERVER_DELAY);
  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, debouncedValue, PAGINATION_ORDER.desc);

  //ref, inview
  //ref -> 특정한 HTML요소를 검사할 수 있음.
  const { ref, inView } = useInView({ threshold: 0 });
  const { accessToken } = useAuth();

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  console.log(inView);

  if (isError) {
    return <div className="mt-20"> Error.. </div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Outlet />
      <input
        className="border p-4 rounded-sm "
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>

      {/* {lps?.pages?.map((page) => {
        console.log(page.data.data);
      })} */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => <LpCard key={lp.id} lp={lp} />)}
        {isFetching && <LpCardSkeletonList count={1} />}
      </div>

      {/* <div
        ref={ref}
        className={"mt-8 flex justify-center bg-gray-400 h-2"}
      ></div> */}

      <div ref={ref}> {!isFetching && <LpCardSkeletonList count={1} />}</div>
    </div>
  );
}
