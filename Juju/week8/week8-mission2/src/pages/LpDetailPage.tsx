import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart } from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import usePostLike from "../hooks/mutations/usePostLike";

const LpDetailPage = () => {
  const { lpId } = useParams();
  const { accessToken } = useAuth();
  const {
    data: lp,
    isLoading,
    isError,
    isFetching,
  } = useGetLpDetail({ lpid: Number(lpId) });

  const { data: me } = useGetMyInfo(accessToken);
  // mutate -> 비동기 요청 실행하고 콜백 함수를 이용해서 후속 작업 처리.
  // mutateAsync -> Promise 반환, await 사용 가능.
  const { mutate: likeMutate, /* mutateAsync */ } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();

  const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id);

  const handleLikeLp = async () => {
    likeMutate({ lpid: Number(lpId) });
  };

  const handleDislikeLp = async () => {
    dislikeMutate({ lpid: Number(lpId) });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Errors occured.</div>
  }

  return (
    <div className={"mt-12"}>
      <h1>{lp?.data.title}</h1>
      <img src={lp?.data.thumbnail} alt={lp?.data.title} />
      <p>{lp?.data.content}</p>
      
      <button
        onClick={isLiked ? handleDislikeLp : handleLikeLp}
        disabled={isFetching}   // isFetching 동안 disabled
        className="flex items-center space-x-2"
      >
        <Heart
          color={isLiked ? "red" : "black"}
          fill={isLiked ? "red" : "transparent"}
        />
      </button>
    </div>
  );
};

export default LpDetailPage;