import { NavbarNotLoginned } from "../components/NavbarNotLoginned";
import { useLogin } from "../context/useLogin";
import { NavbarIsLoginned } from "../components/NavbarIsLoginned";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  const { isLogin } = useLogin();
  return (
    <>
      {!isLogin && <NavbarNotLoginned />}
      {isLogin && <NavbarIsLoginned />}
      <Link to="/">Home</Link>
    </>
  );
}
