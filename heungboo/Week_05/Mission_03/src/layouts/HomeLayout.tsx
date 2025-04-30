import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col justify-between">
      <nav>nav bar 입니다.</nav>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>Footer 입니다.</footer>
    </div>
  );
};

export default HomeLayout;
