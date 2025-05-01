import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white gap-4 p-4">
      <div className="flex gap-2">
        <Link to={"/"} className="text-2xl font-bold text-pink-500">
          홈
        </Link>
        <Link to={"/myinfo"} className="text-2xl font-bold text-pink-500">
          내정보
        </Link>
      </div>
      <div className="flex gap-2">
        <Link to={"/login"} className="bg-black px-4 py-2 rounded-md">
          로그인
        </Link>
        <Link to={"/signup"} className="bg-pink-500 px-4 py-2 rounded-md">
          회원가입
        </Link>
      </div>
    </nav>
  )
}

export default Navbar