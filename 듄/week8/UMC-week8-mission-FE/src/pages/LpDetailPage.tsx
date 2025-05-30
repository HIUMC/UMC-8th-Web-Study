import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { Heart } from "lucide-react";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";

const LpDetailPage = () => {
  const { lpId } = useParams();
  const { accessToken } = useAuth();
  const { data:lp, isPending, isError } = useGetLpDetail({lpId: Number(lpId)});
  
  const {data:me} = useGetMyInfo(accessToken);

  const {mutate: likeMutate} = usePostLike();
  const {mutate: dislikeMutate} = useDeleteLike();

  const isLiked = lp?.data.likes
  .map((like) => like.userId)
  .includes(me?.data.id as number);

  const handleLikeLp = () =>{
    likeMutate({lpId: Number(lpId)});
  };

  const handleDislikeLp = () =>{
    dislikeMutate({lpId: Number(lpId)});
  }

  if(isPending){
    return <div> Loading... </div>;
  }

  if(isError){
    return <div> Error </div>;
  }

  return(
    <div>
      <h1>{lp?.data.title}</h1>
      <img 
        src={lp?.data.thumbnail} 
        alt={lp?.data.title} 
        className="w-[400px] h-[400px] object-cover" //이미지 크기 고정 처리
      />
      <p>{lp?.data.content}</p>

      <button onClick={isLiked ? handleDislikeLp : handleLikeLp}>
        <Heart color={isLiked ? "red" : "black"} fill={isLiked ? "red" : "transparent"}/>
      </button>
    </div>
  )
};

export default LpDetailPage;
