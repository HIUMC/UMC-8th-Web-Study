import { Outlet } from "react-router-dom";
import { NavbarNotLoginned } from "../components/NavbarNotLoginned";
import { useLogin } from "../context/useLogin";
import { NavbarIsLoginned } from "../components/NavbarIsLoginned";
import useGetLpList from "../hooks/queries/useGetLpList";
export default function HomePage() {
  //children을npm 설정했으므로 children을 기준으로outlet을 설정해줘야 parents 기준의 children이 제대로 렌더링이 됨.

  const { data } = useGetLpList({});

  console.log(data?.data.map((lp) => lp.id));
  const { isLogin } = useLogin();
  return (
    <>
      {!isLogin && <NavbarNotLoginned />}
      {isLogin && <NavbarIsLoginned />}

      <Outlet />
      {data?.data.map((lp) => <h1>{lp.title}</h1>)}
    </>
  );
}
