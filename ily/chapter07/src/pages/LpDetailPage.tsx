import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart } from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import { deleteLike, postLike } from "../apis/lp";
import { LIKES } from "../utils/types/lp";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";

const LpDetailPage = () => {
  const { accessToken } = useAuth();
  const { lpId } = useParams();
  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetail({ lpId: Number(lpId) });
  const { data: me } = useGetMyInfo(accessToken);
  console.log(me);

  // mutate -> 비동기 요청을 실행하고, 콜백 함수를 이용해서 후속 작업 처리함.
  // mutateAsync -> Promise를 반환해서 await

  const { mutate: likeMutate } = usePostLike();
  const { mutate: deletelikeMutate } = useDeleteLike();

  // const isLiked = lp?.data.likes
  //   .map((like: LIKES) => like.userId)
  //   .includes(me?.data.id as number);
  const isLiked = lp?.data.likes.some(
    (like: LIKES) => like.userId === me?.data.id,
  );

  const handleLikeLP = () => {
    likeMutate({ lpId: Number(lpId) });
  };

  const handleDeleteLikeLP = () => {
    deletelikeMutate({ lpId: Number(lpId) });
  };
  console.log();
  if (isPending && isError) {
    return <div>로딩 중이거나 에러가 발생했습니다.</div>;
  }
  return (
    <div className="mt-12">
      <h1>{lp?.data.id}</h1>
      <h1>{lp?.data.title}</h1>
      <img src={lp?.data.thumbnail} alt={lp?.data.title}></img>
      <p>{lp?.data.content}</p>

      <button onClick={isLiked ? handleDeleteLikeLP : handleLikeLP}>
        <Heart
          color={isLiked ? "red" : "black"}
          fill={isLiked ? "red" : "transparent"}
        />
      </button>
    </div>
  );
};

export default LpDetailPage;
