import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart } from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import { Likes } from "../types/lp";
import { deleteLike, postLike } from "../apis/lp";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";

const LpDetailPage = () => {
  const {lpId} = useParams();
  const {accessToken} = useAuth(); 
  const {
    data:lp, 
    isPending,
    isError,
  }=useGetLpDetail({lpId: Number(lpId)});

  const {data:me} = useGetMyInfo(accessToken); 
  const {mutate:likeMutate} = usePostLike(); 
  const {mutate:disLikeMutate} = useDeleteLike();

  const isLiked = lp?.data.likes
  .map((like: Likes)=>like.userId)
  .includes(me?.data.id as number); 
  
  const handleLikeLp = () => {
    likeMutate({lpId: Number(lpId)});
  }; 

  const handleDislikeLp = () => {
    disLikeMutate({lpId: Number(lpId)});
  }; 

  if(isPending && isError){
    return <></>; 
  }

  return (
    
    <div className="mt-12 max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
   
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{lp?.data.title}</h1>

     
      <img
        src={lp?.data.thumbnail}
        alt={lp?.data.title}
        className="w-full h-auto rounded-lg shadow-md mb-6"
      />

     
      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
        {lp?.data.content}
      </p>

    
      <div className="flex items-center space-x-4">
        <button
          onClick={isLiked ? handleDislikeLp : handleLikeLp}
          className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300 px-4 py-2 rounded-lg shadow-md transition-all"
        >
          <Heart
            className="w-6 h-6"
            stroke={isLiked ? "red" : "black"}
            fill={isLiked ? "red" : "none"}
          />
          <span className="text-lg font-medium">{isLiked ? "Liked" : "Like"}</span>
        </button>
      </div>
    </div>
  );
}; 

export default LpDetailPage;