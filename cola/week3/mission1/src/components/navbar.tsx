import { Link } from "react-router-dom";

const Navbar = () => {
  const LinkStyle = "px-1.5 hover:text-green-400 transition";
  return (
    <nav>
      <Link to={"/"} className={LinkStyle}>
        홈
      </Link>
      <Link to="/movies/popular" className={LinkStyle}>
        인기 영화
      </Link>
    </nav>
  );
};

export default Navbar;
