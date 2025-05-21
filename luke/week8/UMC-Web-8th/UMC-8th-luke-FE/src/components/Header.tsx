
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useCheckLogin } from "../hooks/useChecklogin";

export default function Header() {
  const logout = useLogout();
  const { name, isAuthenticated } = useCheckLogin();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 shadow-md">
      {/* 왼쪽 로고 / 타이틀 */}
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide text-white hover:text-blue-400 transition-colors"
      >
        <span className="text-blue-400">Luke</span>Page
      </Link>

      {/* 오른쪽 버튼 그룹 */}
      <div className="flex gap-3 text-sm font-medium">
      {isAuthenticated && (
          // 로그인된 상태: 인사말 + 로그아웃
          <> 
            <span className="px-4 py-2 text-gray-200">{name}님, 반갑습니다!</span>
            
          </>
        ) 
        }

        <Link
          to="/lp"
          className="px-4 py-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
        >
          LP
        </Link>
        <Link
          to="/MyPage"
          className="px-4 py-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
        >
          MyPage
        </Link>
        {!isAuthenticated && (
          <>
            <Link
              to="/signin"
              className="px-4 py-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
            >
              SignIn
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition" 
            >
              Login
            </Link>
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