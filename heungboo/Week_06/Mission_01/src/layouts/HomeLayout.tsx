import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col justify-between">
      <NavBar />
      <main className="flex-1 mt-10">
        <Outlet />
      </main>
      <Footer />
      {/* <footer>Footer 입니다.</footer> */}
    </div>
  );
};

export default HomeLayout;
