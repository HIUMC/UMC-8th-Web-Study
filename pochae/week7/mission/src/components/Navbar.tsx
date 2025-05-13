import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { getMyInfo } from "../apis/auth";

const Navbar = () => {
    const {accessToken, logout} = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        const fetch = async () => {
          const res = await getMyInfo();
          setUserName(res.data.name);
        };
      
        if (accessToken) fetch();
      }, [accessToken]);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
  <>
    <nav className='bg-black dark:bg-gray-900 shadow-md fixed w-full z-10'>
        <div className='flex items-center justify-between p-4'>
            <div className="flex items-center space-x-3">
                {/* ☰ 버튼 */}
                <button onClick={toggleSidebar} 
                        className="text-white text-2xl hover:cursor-pointer">
                    ☰
                </button>

                <Link 
                    to='/' 
                    className='text-xl font-bold text-pink-500 dark:text-white'>
                        LP
                </Link>

            </div>

            <div className='flex items-center space-x-5'>
                <Link to={'/search'} className='text-white hover:text-pink-500'>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTesnQaIIeKboFJaQ4LtnxKLyvP7RhtLsZUIQ&s"
                        alt="검색"
                        className="w-9 h-9 object-contain"
                    />
                </Link>
                {!accessToken && (
                    <>
                        <Link to={"/login"} className='text-white hover:text-pink-500'>로그인</Link>
                        <Link to={"/signup"} className='bg-pink-500 hover:text-pink-600 text-white py-2 px-4 rounded'>회원가입</Link>
                    </>
                )}


                {accessToken &&(
                    <>
                        <div className="text-white">
                            {userName}님 반갑습니다.
                        </div>
                        <button
                            onClick={logout}
                            className="text-white hover:text-pink-500 cursor-pointer"
                        >
                            로그아웃
                        </button>
                    </>

                )}
            </div>
        </div>
    </nav>

    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
  </>);
    
}

export default Navbar
