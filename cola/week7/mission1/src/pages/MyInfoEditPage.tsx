import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { ResponseMyInfoDto } from '../types/auth';
import { getMyInfo } from '../apis/auth';
import { FiUser } from 'react-icons/fi';
import { useSidebar } from '../context/SidebarContext';
import useEditMyInfo from '../hooks/mutations/useEditMyInfo';

const MyInfoEditPage = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const { mutate: editMyInfo } = useEditMyInfo();

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

  const [form, setForm] = useState({
    name: '',
    bio: '',
    avatar: '',
  });

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      setData(response);

      setForm({
        name: response.data.name ?? '',
        bio: response.data.bio ?? '',
        avatar: response.data.avatar ?? '',
      });
    };
    getData();
  }, []);

  const handleEdit = () => {
    if (form.name.trim().length < 1) {
      alert('이름은 1글자 이상 입력해주세요');
      return;
    }

    editMyInfo({
      name: form.name,
      bio: form.bio || null,
      avatar: form.avatar || null,
    });

    alert('회원정보가 변경되었습니다!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative flex h-full">
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
      <div className="flex p-4 gap-5 w-full bg-gray-600 text-white">
        {data.data?.avatar === null ? (
          <FiUser className="w-20 h-20" />
        ) : (
          <img className="w-20 h-20" src={form.avatar} alt="프로필 사진" />
        )}
        <div className="flex flex-col gap-2">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border-2 border-white rounded-md p-1"
            placeholder="이름을 입력해주세요"
          />
          <input
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="border-2 border-white rounded-md p-1"
            placeholder="자기소개를 입력해주세요"
          />
          <input
            name="avatar"
            value={form.avatar}
            onChange={handleChange}
            className="border-2 border-white rounded-md p-1"
            placeholder="프로필 이미지 URL"
          />
          <input className="text-sm p-1" placeholder={data.data.email} />
          <button
            onClick={handleEdit}
            className="cursor-pointer w-15 h-10 bg-pink-500 rounded-md"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyInfoEditPage;
