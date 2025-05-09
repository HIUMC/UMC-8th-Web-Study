import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

const HomePage = () => {
  const [search, setSearch] = useState("");
  
  const {data: lps, isFetching, hasNextPage, isPending, fetchNextPage, isError} = useGetInfiniteLpList(50, search, PAGINATION_ORDER.DESC);
  
  const{ref, inView} = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if(inView){
      !isFetching && hasNextPage && fetchNextPage()
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if(isPending) return <div>Loading...</div>;
  if(isError) return <div>Error</div>;

  console.log(lps);

  return (
    <div className = "container mw-auto px-4 py-6">
      <input value = {search} onChange = {(e) => setSearch(e.target.value)} />

      <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}>
        {lps?.pages
        ?.map((page) => page.data.data)
        ?.flat()
        ?.map((lp) => <LpCard key = {lp.id} lp = {lp} /> )}
        {isFetching && <LpCardSkeletonList count = {20} />}
      </div>
      <div ref = {ref} className = "h-2"></div>
    </div>
  );
};

export default HomePage;
