import { Link } from "react-router-dom";

const Navbar = () => {
  const LinkStyle = "px-1.5 hover:text-[#b2dab1] transition";
  return (
    <nav>
      <Link to={"/"} className={LinkStyle}>
        홈
      </Link>
      <Link to="/movies/popular" className={LinkStyle}>
        인기 영화
      </Link>
      <Link to="/movies/now_playing" className={LinkStyle}>
        상영 중
      </Link>
      <Link to="/movies/top_rated" className={LinkStyle}>
        평점 높은
      </Link>
      <Link to="/movies/upcoming" className={LinkStyle}>
        개봉 예정
      </Link>
    </nav>
  );
};

export default Navbar;
