import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { NavbarIsLoginned } from "../components/NavbarIsLoginned";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();

      setData(response);
      console.log("response 출력:", response);
    };

    console.log("data출력:", data);

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div>
      {/*로그아웃 link는 존재하지만 실제 구현하진 않았음. */}
      <NavbarIsLoginned />{" "}
      <div>
        {data?.data?.name} {data?.data?.email}
        <img className="w-100 h-100" src={data?.data?.avatar} alt="profile" />
      </div>
      <button
        className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
