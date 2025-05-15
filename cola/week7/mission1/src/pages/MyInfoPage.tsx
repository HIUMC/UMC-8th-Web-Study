import { useState, useEffect } from 'react';
import { ResponseMyInfoDto } from '../types/auth';
import { getMyInfo } from '../apis/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useSidebar } from '../context/SidebarContext';

const MyInfoPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto>({
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
  });
  const { isSidebarOpen, closeSidebar } = useSidebar();

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);

      setData(response);
    };
    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSettings = () => {
    return navigate('edit');
  };

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
      <div className="flex-1 flex flex-col p-5 gap-5">
        <h1>{data.data?.name}님 환영합니다.</h1>
        <img src={data.data?.avatar as string} alt={'구글 로고'} />
        <h1>{data.data?.email}</h1>
        <button
          onClick={handleSettings}
          className="cursor-pointer bg-pink-500 w-30 rounded-md p-2"
        >
          개인정보
        </button>
        <button
          className="cursor-pointer bg-gray-700 w-30 rounded-md p-2"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyInfoPage;
