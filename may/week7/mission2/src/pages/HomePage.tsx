import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import LpCard from "../components/LpCard/LpCard";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const{
    data:lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  }=useGetInfiniteLpList(10,search,PAGINATION_ORDER.asc);
  const {ref, inView}=useInView({
    threshold:0,
  });

  useEffect(()=>{
    if(inView){
      if(!isFetching&&hasNextPage){
        console.log("Calling fetchNextPage...");
        fetchNextPage();
      }
    }
  },[inView, isFetching, hasNextPage, fetchNextPage]);
  console.log(inView);

  if (isError) {
    return <div className={"mt-20"}>Error...</div>;
  }

  return (
    <div className={"container mt-auto px-4 py-6"}>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className={ "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      }>
        {isPending && <LpCardSkeletonList count={20} />}
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isFetching && <LpCardSkeletonList count={20} />}

        <div ref={ref} className="h-2" />
      </div>
    </div>
  );
};

export default HomePage;