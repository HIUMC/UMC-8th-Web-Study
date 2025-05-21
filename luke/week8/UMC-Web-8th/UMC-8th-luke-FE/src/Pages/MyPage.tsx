import { useState, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useLogout } from "../hooks/useLogout";
import { useSetNewname } from '../hooks/useSetNewname';

export default function MyPage() {
const { data: userInfo, isLoading, isError } = useQuery<ResponseMyInfoDto>({
  queryKey: ['myInfo'],
  queryFn: () => getMyInfo(),
  staleTime: 1000 * 60 * 5,
});
  const logout = useLogout();

  const setNewname = useSetNewname();
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState("");  

  useEffect(() => {
    if (userInfo) setDraftName(userInfo.name);
  }, [userInfo]);

  const finishEditing = () => {
    setIsEditing(false);
    if (draftName && draftName !== String(userInfo?.name)) {
      setNewname.mutate({ name: draftName });
    }
  };

  if (isLoading) return <div className="text-white p-4">로딩 중…</div>;
  if (isError || !userInfo) return <div className="text-white p-4">정보를 불러올 수 없습니다.</div>;

  return (
    <div className="text-white p-4">
      <h1 className="text-xl font-bold mb-2">마이페이지</h1>
      <p>이메일: {userInfo.email}</p>
      <p>이름: {" "}{!isEditing ? (<span className="cursor-pointer underline" onClick={() => setIsEditing(true)}>
              {String(userInfo.name)}</span>) : (<input className="text-black px-1 rounded text-white p-4" value={draftName}
              onChange={e => setDraftName(e.target.value)}
              onBlur={finishEditing}
              onKeyUp={e => e.key === "Enter" && finishEditing()}
              autoFocus
            />
          )
        }
      </p>
      <p>가입일: {userInfo.createdAt}</p>
      <button onClick={logout}className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition-colors">
            Logout</button>
    </div>
  );
}
