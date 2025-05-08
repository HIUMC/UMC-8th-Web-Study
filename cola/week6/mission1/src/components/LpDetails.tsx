import { useParams } from "react-router-dom"
import useGetLpDetails from "../hooks/queries/useGetLpDetails";
import { FiEdit, FiTrash } from "react-icons/fi";

const LpDetails = () => {
    const { lpId } = useParams<{ lpId: string }>();
    const {data, isPending, isError} = useGetLpDetails({lpId: Number(lpId)});

    if (isPending) return <h1>Loading...</h1>;
    if (isError) return <h1>Error...</h1>;

    return (
    <div className="px-20 py-5 w-200 h-145 ml-60 rounded-lg my-5 bg-gray-800 flex flex-col gap-4 items-center">
        <div className="flex justify-between items-center w-full">
            <div className="text-xl">{data.author.name}</div>
            <div className="text-sm">{new Date(data.createdAt).getDay()}일 전</div>
        </div>
        <div className="flex justify-between items-center w-full">
            <div>{data.title}</div>
            <div className="flex gap-2">
                <FiEdit className="text-gray-300 cursor-pointer" />
                <FiTrash className="text-gray-300 cursor-pointer" />
            </div>
        </div>
        <div className="flex justify-center items-center w-80 h-80 shadow-2xl rounded-md bg-gray-500">
            <div className="relative w-70 h-70 shadow-2xl rounded-full overflow-hidden">
                <img src={data.thumbnail} alt="thumbnail" className="w-full h-full object-cover rounded-full" style={{animation: "spin 10s linear infinite"}} />
                <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-gray-400 rounded-full -translate-x-1/2 -translate-y-1/2 z-10"></div>
            </div>
        </div>
        <div className="text-sm">
            {data.content}
        </div>
        <button className="cursor-pointer">
            ♥️ {data.likes.length}
        </button>
    </div>
  )
}

export default LpDetails