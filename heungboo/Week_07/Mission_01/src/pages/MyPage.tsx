import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// 내 정보 조회 페이지
const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response: ResponseMyInfoDto = await getMyInfo();
      console.log("response" + response);

      setData(response);
    };

    getData();
  }, []);

  console.log("data : " + data);

  const handlelogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div>
      <h1>My Page 입니다. </h1>
      <img src={data?.data.avatar as string} alt="logo" />
      <h2>이름 : {data?.data.name}</h2>
      <h2>이메일 : {data?.data.email}</h2>
      <h2>이메일 : {data?.data.email}</h2>
      <button
        className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90"
        onClick={handlelogout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
