import useGetLpList from "../hooks/queries/useGetLpList";
import { useState } from "react";

const HomePage = () => {
  // search  값 에 따라 LP 리스트를 가져오는 쿼리
  const [search, setSearch] = useState("");
  const { data, isPending, isError } = useGetLpList({ search });

  if (isPending) {
    return <div className={"mt-20"}>Loading...</div>;
  }

  if (isError) {
    return <div className={"mt-20"}>Error...</div>;
  }
  return (
    <>
      // <main className="flex-1">Home Page 입니다.</main>
      <div className={"mt-20"}>
        <input
          className="border-amber-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {data?.map((lp) => (
          <h1>{lp.title}</h1>
        ))}
      </div>
    </>
  );
};

export default HomePage;
