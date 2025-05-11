import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomeLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-black text-white">
        <Navbar />
        <main className="flex-1 mt-10 bg-black">
            <Outlet />
        </main>
        <Footer />
    </div>
  );
};

export default HomeLayout;
