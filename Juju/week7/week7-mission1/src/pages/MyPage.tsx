import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);

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
    navigate("/");  // 로그아웃 후 홈으로 이동
  };
  
  console.log(data?.data?.name);

  return (
    <div className="flex flex-col items-center justify-center mt-10 h-full">
      <h1 className="text-4xl font-bold mb-8 text-center leading-snug">{data?.data.name}님,<br></br>환영합니다!</h1>
      <img
        className="w-40 h-40 rounded-full mb-4 bg-gray-200"
        src={data?.data?.avatar as string}
      />
      <h1 className="text-lg text-gray-00 mb-8">{data?.data?.email}</h1>

      <button
        className="cursor-pointer bg-black text-white rounded-sm px-9 py-3 hover:bg-gray-700"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  )
};

export default MyPage;
