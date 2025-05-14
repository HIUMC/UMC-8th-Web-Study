import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";

import usePostLike from "../hooks/mutations/usePostLike";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import useDeleteLike from "../hooks/mutations/useDeleteLike";

const LpDetailPage = () => {
  // App.tsx 의 IpId와 동일한 이름으로 사용해야함
  const { lpId } = useParams();
  const { accessToken } = useAuth();
  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetail({ lpId: Number(lpId) });

  const { data: me } = useGetMyInfo(accessToken);
  const { mutate: likeMutate } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();

  // const isLiked = lp?.data.likes
  //  .map((like) => like.userId)
  //  .includes(me?.data.id as number);
  // 내 아이디와 일치하는 지 확인

  // 위에 보다 some이 조금 더 빠름
  // some (js) : 배열의 요소 중 하나라도 조건을 만족하는지 확인
  // map (js) : 배열의 모든 요소를 변환하여 새로운 배열을 반환
  const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id);

  // await -> likeMutate({ lpId: Number(lpId) });
  const handleLikeLp = async () => {
    likeMutate({ lpId: Number(lpId) });
  };

  const handleDislikeLp = async () => {
    dislikeMutate({ lpId: Number(lpId) });
  };

  if (isPending && isError) {
    return <></>;
  }

  return (
    <div className={"mt=12"}>
      <h1>{lp?.data.title}</h1>
      <img src={lp?.data.thumbnail} alt={lp?.data.title} />
      <p>{lp?.data.content}</p>

      <button onClick={isLiked ? handleDislikeLp : handleLikeLp}>
        {/* Heart 는 lucide-react 에서 가져옴 */}
        <Heart
          color={isLiked ? "red" : "black"}
          fill={isLiked ? "red" : "transparent"}
        />
      </button>
    </div>
  );
};

export default LpDetailPage;
