import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { postSignout } from "../apis/auth";

const Navbar = ({onMenuClick}: {onMenuClick: () => void}) => {
    const { logout, username, accessToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    const logoutMutation = useMutation({
        mutationFn: postSignout,
        onError: (error) => {
            console.log('로그아웃 실패', error)
        },
        onSuccess: () => {
            logout();
            navigate('/');
        }
    })

    const isLoggedIn = !!accessToken;

    return (
        <nav className="flex justify-between items-center gap-4 p-4">
            <div className="flex items-center gap-4">
                <button onClick={onMenuClick}>☰</button>
                <div onClick={() => navigate('/')} className="cursor-pointer">
                    안녕하쌉사리와요
                </div>
            </div>
            
            <div className="flex gap-4">
                {isLoggedIn ? (
                    <>
                        <div>{username}님 반갑습니다</div>
                        <button onClick={handleLogout} className="text-red-500">
                            로그아웃
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">로그인</Link>
                        <Link to="/signup">회원가입</Link>
                    </>
                )}
            </div>
        </nav>
    );
}; 

export default Navbar; 