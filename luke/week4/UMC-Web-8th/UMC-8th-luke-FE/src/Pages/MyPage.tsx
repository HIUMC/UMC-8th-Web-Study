import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        console.log("getMyInfo 호출 시작");
        const data = await getMyInfo();
        console.log("정보도착");
        setUserInfo(data);
      } catch (error) {
        setUserInfo(null); // 오류 발생 시 null로 설정
      }
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) return <div className="text-white p-4">로딩 중...</div>;

  return (
    <div className="text-white p-4">
      <h1 className="text-xl font-bold mb-2">마이페이지</h1>
      <p>이메일: {userInfo.email}</p>
      <p>닉네임: {userInfo.nickname}</p>
    </div>
  );
}
