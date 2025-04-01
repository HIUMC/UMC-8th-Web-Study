import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export default function HomePage() {
  //children을 설정했으므로 children을 기준으로outlet을 설정해줘야 parents 기준의 children이 제대로 렌더링이 됨.
  //그냥 주석 추가함
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
