import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav>
        <Link to={"/"}>홈페이지로 이동</Link>
        <Link to={"/movies"}>영화 페이지로 이동</Link>
      </nav>
    </div>
  );
};

export default Navbar;
