import { useParams } from 'react-router-dom';
import useGetLpDetails from '../../hooks/queries/useGetLpDetails';
import { FiEdit, FiTrash } from 'react-icons/fi';
import CommentList from '../Comment/CommentList';
import useGetMyInfo from '../../hooks/queries/useGetMyInfo';
import { useAuth } from '../../context/AuthContext';
import usePostLike from '../../hooks/mutations/usePostLike';
import useDeleteLike from '../../hooks/mutations/useDeleteLike';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const LpDetails = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetails({ lpId: Number(lpId) });

  const { accessToken } = useAuth();
  const { data: myinfo } = useGetMyInfo(accessToken);
  const isLiked = lp?.likes
    .map((like) => like.userId)
    .includes(myinfo?.id as number);

  // mutate -> 비동기 요청을 실행하고, 콜백 함수를 이용해서 후속 작업 처리함.
  // mutateAsync -> Promise를 반환해서 await 사용 가능.
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();

  const handleLikeLp = () => {
    likeMutate({ lpId: Number(lpId) });
  };

  const handleDisLikeLp = () => {
    disLikeMutate({ lpId: Number(lpId) });
  };

  if (isPending) return <h1>Loading...</h1>;
  if (isError) return <h1>Error...</h1>;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="px-20 py-5 md:w-200 h-145 rounded-lg my-5 bg-gray-800 flex flex-col gap-4 items-center">
        <div className="flex justify-between items-center w-full">
          <div className="text-xl">{lp.author.name}</div>
          <div className="text-sm">{new Date(lp.createdAt).getDay()}일 전</div>
        </div>
        <div className="flex justify-between items-center w-full">
          <div>{lp.title}</div>
          <div className="flex gap-2">
            <FiEdit className="text-gray-300 cursor-pointer" />
            <FiTrash className="text-gray-300 cursor-pointer" />
          </div>
        </div>
        <div className="flex justify-center items-center w-80 h-80 shadow-2xl rounded-md bg-gray-500">
          <div className="relative w-70 h-70 shadow-2xl rounded-full overflow-hidden">
            <img
              src={lp.thumbnail}
              alt="thumbnail"
              className="w-full h-full object-cover rounded-full"
              style={{ animation: 'spin 10s linear infinite' }}
            />
            <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-gray-400 rounded-full -translate-x-1/2 -translate-y-1/2 z-10"></div>
          </div>
        </div>
        <div className="text-sm">{lp.content}</div>
        <button className="cursor-pointer">
          {isLiked ? (
            <AiFillHeart onClick={handleDisLikeLp} color="red" size={24} />
          ) : (
            <AiOutlineHeart onClick={handleLikeLp} color="gray" size={24} />
          )}
        </button>
      </div>
      <CommentList />
    </div>
  );
};

export default LpDetails;
