import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const { data, isPending, isError } = useGetLpList({search});

  if (isPending) return <h1 className="mt-20 p-4">Loading...</h1>;
  if (isError) return <h1 className="mt-20 p-4">Error...</h1>;

  return (
    <div className="p-4">
      <input
        className="border-1 border-gray-300 rounded-md px-4 py-2 mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
      {data?.data.map((lp) => <h1>{lp.title}</h1>)}
    </div>
  );
}

export default HomePage;