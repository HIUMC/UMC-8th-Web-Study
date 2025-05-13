import { useParams } from "react-router-dom"
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import {Heart} from "lucide-react"
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";

const LpDetailPage = () => {
    const { lpId } = useParams();
    const { accessToken } = useAuth();
    const { data:lp, isPending, isError } = useGetLpDetail({lpId: Number(lpId)});

    const { data: me } = useGetMyInfo(accessToken);
    // mutate -> 비동기 요청을 실행하고, 콜백 함수를 이용해서 후속 작업 처리함.
    // mutateAsync -> Promise를 반환해서 awiat 사용 가능
    const { mutate:likeMutate } = usePostLike();
    const { mutate:dislikeMutate } = useDeleteLike();

    const isLiked = lp?.data.likes.map((like)=>like.userId).includes(me?.data.id as number);

    const handleLikeLp= async() => {
        likeMutate({lpId: Number(lpId)});
    };

    const handleDislikeLp = async() => {
        dislikeMutate({lpId: Number(lpId)});
    };

    if (isPending) return <div>로딩주웅 .. . .. . </div>
    if (isError) return <div>에러 발생이다!!</div>

    return (
        <div className="bg-gray-800 mt-12 rounded-sm p-6 w-[600px] mx-auto">
          {/* Lp 제목 */}
          <h1 className="text-xl font-bold mb-4 text-center">{lp?.data.title}</h1>

          {/* Lp 썸네일 */}
          <div className="relative w-64 h-64 mx-auto mb-4">
            <img 
              src={lp?.data.thumbnail} 
              alt={lp?.data.title} 
              className="w-full h-full rounded-full border-3 border-black"
            />
            {/* 가운데 흰 구멍.. */}
            <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
      
          {/* content 글씨 */}
          <p className="text-gray-200 text-sm mb-4 text-center">{lp?.data.content}</p>


          {/* 하트 모양 */}
          <div className="flex justify-center">
            <button onClick={isLiked? handleDislikeLp : handleLikeLp } className='hover:cursor-pointer'>
              <Heart color={isLiked? "red" : "black"} fill={isLiked ? "red" : "transparent"}/>
            </button>
          </div>
        </div>
      )
      
}

export default LpDetailPage
