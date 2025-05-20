import { useSidebar } from '../context/SidebarContext';
import LpList from '../components/LpCard/LpCardList';
import Sidebar from '../components/Sidebar';
import AddLpButton from '../components/LpCard/AddLpButton';

const Home = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();

  return (
    <div className="relative flex h-full bg-black text-white">
      {/* 배경 오버레이 */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity md:hidden ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={closeSidebar}
      ></div>

      {/* 사이드바 */}
      <div
        className={`fixed z-50 top-0 left-0 h-full bg-gray-600 transform transition-transform md:translate-x-0 md:static md:block ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex-1">
        <LpList />
        <AddLpButton />
      </div>
    </div>
  );
};

export default Home;
