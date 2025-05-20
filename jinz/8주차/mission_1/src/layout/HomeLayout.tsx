import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import LPModal from "../components/LPModal";
import SearchModal from "../components/Search";

const HomeLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const handleMenuClick = () => {
        setSidebarOpen((prev)=> !prev);
    };
    const handleSidebarClose = () => setSidebarOpen(false);
    const handleSearchClick = () => {
        setSearchOpen((prev) => !prev);
    };
    
    return (
        <div className="h-dvh flex flex-col">
            <Navbar onMenuClick={handleMenuClick}/>
            <div className="flex flex-1">
                <Sidebar 
                    isOpen={sidebarOpen} 
                    onClose={handleSidebarClose}
                    onSearchClick={handleSearchClick}/>
                <main className="flex-1 bg-white">
                    {searchOpen && <>
                        {console.log("검색 모달 열림림")}
                        <SearchModal />
                    </> }
                    <Outlet />
                    <LPModal />
                </main>
            </div>
            <footer>푸터...</footer>
        </div>
    );
};

export default HomeLayout;