// navbar.tsx
import { Link } from "react-router-dom";

// react-router-dom 에서 제공하는 Link 태그를 이용하면, 원하는 경로로 페이지를 이동한다.
const NavBar = () => {
  return (
    <nav>
      <Link to={"/"}>홈 페이지로 이동</Link>
      <div></div>
      <Link to="/movies">영화 목록 페이지로 이동</Link>
    </nav>
  );
};

export default NavBar;
