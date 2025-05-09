import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => { 
  const { accessToken } = useAuth();

  return (
    <nav className="w-full flex items-center justify-between px-8 py-3 bg-[#ebe0d4] shadow-md">
      {/* 왼쪽: 사이트 제목 */}
      <Link to="/" className="text-2xl font-bold text-brown-800 cursor-pointer">
        SpinningSpinning Dolimpan
      </Link>

      <div className="ml-auto flex gap-4">
        {!accessToken && ( //accessToken이 없으면 로그인 회원가입 버튼 보여줌
          <div className="flex gap-4">
            <Link
            to="/login"
            className="px-4 py-2 bg-[#bd9e78] text-brown-800 font-semibold rounded hover:bg-[#6f4f28] transition"
          >
            로그인
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-[#bd9e78] text-brown-800 font-semibold rounded hover:bg-[#6f4f28] transition"
          >
            회원가입
          </Link>
          </div>
        )}
      </div>

      <div>
        {accessToken && (
          <Link
            to={"/my"}
            className="px-4 py-2 bg-[#bd9e78] text-brown-800 font-semibold rounded hover:bg-[#6f4f28] transition"
          >
            마이페이지
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;