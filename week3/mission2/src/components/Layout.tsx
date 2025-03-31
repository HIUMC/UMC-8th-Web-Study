import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>© 2024 TMDB 영화 웹사이트</p>
      </footer>
    </div>
  );
};

export default Layout; 