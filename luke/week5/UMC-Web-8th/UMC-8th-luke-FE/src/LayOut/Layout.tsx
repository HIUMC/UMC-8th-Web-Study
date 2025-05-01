import { Link, Outlet } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

export default function Layout() {
  const logout = useLogout();

  return (
    <div className="min-h-dvh w-full flex flex-col justify-between bg-gray-950 text-white">
      <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 shadow-md">
        {/* 왼쪽 로고 / 타이틀 */}
        <Link to="/" className="text-2xl font-bold tracking-wide text-white hover:text-blue-400 transition-colors">
          <span className="text-blue-400">Luke</span>Page</Link>
        {/* 오른쪽 버튼들 */}
        <div className="flex gap-4">
          <Link to="/MyPage" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors">MyPage</Link>
          <Link to="/login" className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors">
            Login</Link>
          <Link to="/signin"className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors">
            Sign In</Link>
          <button onClick={logout}className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition-colors">
            Logout</button>
        </div>
      </nav>

      <main className="flex-1 p-6"><Outlet /></main>
      <footer className="text-center py-4 text-sm text-gray-400">  ⓒ 2025 LukePage. All rights reserved.</footer>
    </div>
  );
}