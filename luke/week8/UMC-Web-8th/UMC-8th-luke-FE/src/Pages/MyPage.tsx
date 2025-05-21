import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useLogout } from "../hooks/useLogout";
export default function MyPage() {
  const [userInfo, setUserInfo] = useState<ResponseMyInfoDto | null>(null);
  const logout = useLogout();
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getMyInfo();
        setUserInfo(data);
      } catch {
        setUserInfo(null); 
      }
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) return <div className="text-white p-4">뭔가 많이 잘못된 겁니다.</div>;

  return (
    <div className="text-white p-4">
      <h1 className="text-xl font-bold mb-2">마이페이지</h1>
      <p>이메일: {userInfo.email}</p>
      <p>닉네임: {userInfo.name}</p>
      <p>가입일: {userInfo.createdAt}</p>
      <button onClick={logout}className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition-colors">
            Logout</button>
    </div>
  );
}
