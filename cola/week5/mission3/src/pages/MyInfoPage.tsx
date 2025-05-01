import { useState, useEffect } from 'react';
import { ResponseMyInfoDto } from '../types/auth';
import { getMyInfo } from '../apis/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    const getData = async () => {
      // console.log(localStorage.getItem('accessToken')); 여긴 OK
      const response = await getMyInfo(); // 여기가 문제, 헤더에 토큰은 정상. 리프레시 토큰 문제?
      console.log(response);

      setData(response);
    };
    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  console.log(data.data?.name); //console.log 출력 안됨

  return (
    <div>
      <h1>{data.data?.name}님 환영합니다.</h1>
      <img src={data.data?.avatar as string} alt={'구글 로고'} />
      <h1>{data.data?.email}</h1>

      <button
        className="cursor-pointer bg-blue-300 rounded-md p-2"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyInfoPage;
