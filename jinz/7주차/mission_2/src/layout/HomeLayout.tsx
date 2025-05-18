import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import LPModal from "../components/LPModal";

const HomeLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleMenuClick = () => {
        setSidebarOpen((prev)=> !prev);
    };
    const handleSidebarClose = () => setSidebarOpen(false);

    return (
        <div className="h-dvh flex flex-col">
            <Navbar onMenuClick={handleMenuClick}/>
            <div className="flex flex-1">
                <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose}/>
                <main className="flex-1 bg-white">
                    <Outlet />
                    <LPModal />
                </main>
            </div>
            <footer>푸터...</footer>
        </div>
    );
};

export default HomeLayout;