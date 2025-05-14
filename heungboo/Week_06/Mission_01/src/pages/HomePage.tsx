import useGetLpList from "../hooks/queries/useGetLpList";
import { useState } from "react";

const HomePage = () => {
  // search  값 에 따라 LP 리스트를 가져오는 쿼리
  const [search, setSearch] = useState("욱");
  const { data, isPending, isError } = useGetLpList({ search });

  if (isPending) {
    return <div className={"mt-20"}>Loading...</div>;
  }

  if (isError) {
    return <div className={"mt-20"}>Error...</div>;
  }

  console.log(data);
  return (
    <>
      <main className="flex-1 border-4 mt-5">Home Page 입니다.</main>
      <div className="mt-10">
        <input
          className="border-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {data?.map((lp) => {
          return (
            <h1 key={lp.id}>
              {lp.id} : {lp.title}
            </h1>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
