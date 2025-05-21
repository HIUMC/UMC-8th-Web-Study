
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from '../apis/auth';

//useCheckLogin을 아예 날려버렸음 대신해서 useQuery와 isAuthenticated를 사용함
export default function Header() {
  const logout = useLogout();
  const token = localStorage.getItem('accessToken');
  const isAuthenticated = !!token;

  // 2) 로그인된 경우에만 유저 정보 fetch
  const { data: userInfo, isLoading } = useQuery({
    queryKey: ['myInfo'],
    queryFn: () => getMyInfo(),
    enabled: isAuthenticated,           // ← 토큰이 있을 때만 실행
    staleTime: 1000 * 60 * 5,
  });

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 shadow-md">
      {/* 왼쪽 로고 / 타이틀 */}
      <Link  to="/" className="text-2xl font-bold tracking-wide text-white hover:text-blue-400 transition-colors">
        <span className="text-blue-400">Luke</span>Page
      </Link>

      {/* 오른쪽 버튼 그룹 */}
      <div className="flex gap-3 text-sm font-medium">
        {isAuthenticated && ( <span className="px-4 py-2 text-gray-200">{`${userInfo?.name || '사용자'}님, 반갑습니다!`}</span> ) }

        <Link to="/lp" className="px-4 py-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition">LP</Link>

        <Link  to="/MyPage" className="px-4 py-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition" >MyPage</Link>

        {!isAuthenticated && ( <><Link to="/signin" className="px-4 py-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition">SignIn</Link>

        <Link to="/login" className="px-4 py-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition">Login</Link>
        </>
        )}

{isAuthenticated && (
        <><button
        onClick={logout}
        className="px-4 py-2 rounded-md border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition"
      >
        Logout
      </button></> 
      )}
      </div>

      
    </nav>
  );
}