import { useEffect,useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

useEffect(() => {
  const getData = async () => {
    const response = await getMyInfo();
    console.log(response);

    setData(response)
  };

  getData();
}, []);

const handleLogout = async () => {
  await logout();
  navigate("/");
};

  return(
  <div> 
    <h1> {data?.data?.name}님 환영합니다. </h1>
    <img src={data?.data?.avatar as string} alt={"구글 로고"} />
    <h1> {data?.data?.email} </h1>

    <button
      className="cursor-pointer bg-blue-500 text-white p-2 rounded-md hover:bg-blue-800"
     onClick={handleLogout}> 로그아웃 </button>
  </div>
  );
};

export default MyPage;