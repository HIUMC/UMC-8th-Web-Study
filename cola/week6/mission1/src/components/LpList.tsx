import useGetLpList from "../hooks/queries/useGetLpList"
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LpList = () => {
    const [search] = useState("");
    const [sortType, setSortType] = useState("latest");
    const {data, isPending, isError} = useGetLpList({search});
    const {accessToken} = useAuth();
    const navigate = useNavigate();

    const getSortedData = () => {
        return data?.slice().sort((a, b)=>{
            if (sortType === "oldest") {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            } else {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        })
    }

    const sortedData = getSortedData();

    const sortHandler = () => {
        if (sortType === "latest") {
            setSortType("oldest");
        }
        else {
            setSortType("latest");
        }
    }

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      };

    const lpClickHandler = (lpId: number) => {
        navigate(`/lp/${lpId}`);
    }
      

    if (isPending) return <h1>Loading...</h1>;
    if (isError) return <h1>Error...</h1>;
    
    return (
    <div className="flex flex-col p-5 gap-5">
        <div className="flex justify-end">
          <button onClick={sortHandler} className={`p-2 rounded-md cursor-pointer ${sortType === "oldest" ? "bg-white text-black" : "bg-black text-white"}`}>오래된순</button>
          <button onClick={sortHandler} className={`p-2 rounded-md cursor-pointer ${sortType === "latest" ? "bg-white text-black" : "bg-black text-white"}`}>최신순</button>
        </div>
        
        <div className="grid grid-cols-3 gap-4">

    {sortedData?.map((lp) => (
        <div
        key={lp.id}
        className="relative aspect-square overflow-hidden rounded-lg group hover:scale-105 transition-transform duration-300"
        >
            <img
            src={lp.thumbnail}
            alt={lp.title}
            className="w-full h-full object-cover cursor-pointer"
            onClick={()=>lpClickHandler(lp.id)}
            />
    
            {/* 오버레이: group-hover로 보여지게 */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"></div>
        
            {/* 텍스트: group-hover로 보여지게 + z-index 더 높게 */}
            <div className="absolute bottom-0 left-0 right-0 z-10 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-base font-semibold">{lp.title}</h3>
                <div className="flex justify-between items-center text-sm mt-1">
                    <span>{formatDate(String(lp.createdAt))}</span>
                    <span>♥️ {lp.likes.length}</span>
                </div>
            </div>
        </div>
    
    ))}
    </div>

    </div>
  )
}

export default LpList