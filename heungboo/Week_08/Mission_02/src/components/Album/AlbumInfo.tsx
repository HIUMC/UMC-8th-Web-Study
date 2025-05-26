import React from "react";
import { Heart } from "lucide-react";
import useGetMyInfo from "../../hooks/queries/useGetMyInfo";
import useGetLpDetail from "../../hooks/queries/useGetLpDetail";
import { useAuth } from "../../context/AuthContext";

import useDeleteLike from "../../hooks/mutations/useDeleteLike";
import usePostLike from "../../hooks/mutations/usePostLike";

interface AlbumInfoProps {
  lpId: number;
}

const AlbumInfo: React.FC<AlbumInfoProps> = ({ lpId }) => {
  // useGetMyInfo 를 사용하기 위해 useAuth로 accessToeken 가져오기
  const { accessToken } = useAuth();
  const {
    data: me,
    isPending: isUserPending,
    isError: isUserError,
  } = useGetMyInfo(accessToken);

  // 앨범 정보 가져오기
  const {
    data: lp,
    isPending: isLpPending,
    isError: isLpError,
  } = useGetLpDetail({
    lpId,
  });

  const { mutate: PostDeleteLike } = useDeleteLike();
  const { mutate: PostLike } = usePostLike();

  const handleDisLike = async () => {
    await PostDeleteLike({
      lpId: Number(lpId),
    });
  };

  const handleLike = async () => {
    await PostLike({
      lpId: Number(lpId),
    });
  };

  const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id);

  // 로딩 상태 처리
  if (isUserPending || isLpPending) return <div>Loading...</div>;

  // 오류 상태 처리
  if (isUserError || isLpError || !me || !lp)
    return <div>Error loading data</div>;

  return (
    <div className="flex justify-center items-center mt-15">
      <div className="bg-gray-300 rounded-2xl shadow-lg w-full max-w-5xl p-6">
        <div className="flex items-center mb-3 ml-5">
          <img
            src={me?.data.avatar || "/default-profile.png"}
            alt={me?.data.name}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <h2 className="text-xl font-bold text-blue-400">{me?.data.name}</h2>
        </div>

        {/* LP Title (오른쪽) 수정/삭제 (왼쪽) */}
        <div className="flex justify-between items-center mb-6 ml-5">
          <h1 className="text-2xl font-bold text-gray-900">{lp.data.title}</h1>
          <div className="flex space-x-4 mr-5">
            <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              편집{/* <Edit className="w-5 h-5 text-gray-600" /> */}
            </button>
            <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              삭제{/* <Trash className="w-5 h-5 text-gray-600" /> */}
            </button>
          </div>
        </div>

        {/* 앨범 사진 */}
        <div className="mb-6">
          <img
            src={lp.data.thumbnail}
            alt={lp.data.title}
            className="w-full h-80 object-cover rounded-full"
          />
        </div>

        {/* 앨범 소개 */}
        <div className="mb-6">
          <div className="flex justify-center items-center text-gray-700 text-lg align-middle">
            {lp.data.content}
          </div>
        </div>

        {/* 태그 */}
        <div className="mb-6">
          <div className="flex justify-center items-center flex-wrap gap-2">
            {lp.data.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>

        {/* 좋아요 */}
        <div className="flex justify-center items-center">
          <button
            className="flex items-center space-x-2 text-red-500"
            onClick={isLiked ? handleDisLike : handleLike}
          >
            {/* Heart 이모지 => lucide-react */}
            <Heart
              className="w-8 h-8"
              color={isLiked ? "red" : "black"}
              fill={isLiked ? "red" : "transparent"}
            />
            <span className="text-xl font-bold">{lp.data.likes.length}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlbumInfo;
