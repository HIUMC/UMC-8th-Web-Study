import { useState } from 'react';
import { ResponseMyInfoDto } from '../types/auth';
import Sidebar from '../components/Sidebar';
import { useSidebar } from '../context/SidebarContext';
import { FiUser } from 'react-icons/fi';
import EditMyInfo from '../components/MyInfo/EditMyInfo';
import useGetMyInfo from '../hooks/queries/useGetMyInfo';
import { useAuth } from '../context/AuthContext';
import MyLpCard from '../components/LpCard/MyLpCardList';
import LikedLpCard from '../components/LpCard/LikedLpCard';

const MyInfoPage = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const [editMyInfoState, setEditMyInfoState] = useState(false);
  const { accessToken } = useAuth();
  const [lpViewType, setLpViewType] = useState('my');

  const data: ResponseMyInfoDto = useGetMyInfo(accessToken).data || {
    status: false,
    statusCode: 0,
    message: '',
    data: {
      id: 0,
      name: '',
      email: '',
      bio: null,
      avatar: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
  const [myInfo, setMyInfo] = useState(data);

  return (
    <div className="relative flex h-full bg-black text-white">
      {/* 배경 오버레이 */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity md:hidden ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={closeSidebar}
      ></div>

      {/* 사이드바 */}
      <div
        className={`fixed z-50 top-0 left-0 h-full bg-gray-600 transform transition-transform md:translate-x-0 md:static md:block ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex flex-col bg-gray-600 w-full items-start p-4 gap-5 text-white">
        {editMyInfoState === false ? (
          <div className="flex">
            {data.data?.avatar === null ? (
              <FiUser className="w-20 h-20" />
            ) : (
              <img
                className="w-20 h-20"
                src={data.data?.avatar}
                alt="프로필 사진"
              />
            )}
            <div className="flex flex-col w-50 gap-2">
              <div className="p-1">{data.data?.name}</div>
              <div className="p-1">{data.data?.bio}</div>
              <div className="text-sm p-1">{data.data?.email}</div>
              <button
                onClick={() => setEditMyInfoState(true)}
                className="cursor-pointer w-15 h-10 bg-pink-500 rounded-md"
              >
                설정
              </button>
            </div>
          </div>
        ) : (
          <EditMyInfo
            setEditMyInfoState={setEditMyInfoState}
            myInfo={myInfo}
            setMyInfo={setMyInfo}
          />
        )}
        <div className="flex gap-3">
          <button
            onClick={() => setLpViewType('my')}
            className="cursor-pointer bg-gray-700 p-2 rounded-md"
          >
            내가 생성한 LP
          </button>
          <button
            onClick={() => setLpViewType('like')}
            className="cursor-pointer bg-gray-700 p-2 rounded-md"
          >
            좋아요 누른 LP
          </button>
        </div>
        <div>{lpViewType === 'my' ? <MyLpCard /> : <LikedLpCard />}</div>
      </div>
    </div>
  );
};

export default MyInfoPage;
