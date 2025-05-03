import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

const ProtectedLayout = () =>{
    const {logout}=useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return(
        <div className="h-dvh flex flex-col"> {/*전체 높이 설정*/}
            <nav className="flex gap-4 p-4">네비게이션 바
                <Link to="/mypage">마이페이지</Link>
                <button onClick={handleLogout} className="text-red-500">
                    로그아웃
                </button>
            </nav>
            <main className="flex-1"> {/*flex-1은 남은 공간을 다 차지함*/}
                <Outlet/> {/*children을 렌더링 ㅇㅇ, outlet이 항상 바뀌는 요소들*/}
            </main>
            <footer>푸터...</footer>
        </div>
    )
}

export default ProtectedLayout;