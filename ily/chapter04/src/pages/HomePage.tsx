import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import React from "react";

export default function HomePage() {
  //children을npm 설정했으므로 children을 기준으로outlet을 설정해줘야 parents 기준의 children이 제대로 렌더링이 됨.
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
