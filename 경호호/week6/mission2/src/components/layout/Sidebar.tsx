import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <button 
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-700 p-2 rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div 
        ref={sidebarRef}
        className={`h-screen bg-gray-800 text-white w-64 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:min-h-screen fixed left-0 top-0 z-40 md:sticky`}
      >
        <div className="h-full flex flex-col p-5 overflow-y-auto">
          <h2 className="text-xl font-bold mb-6 mt-10 md:mt-0">카테고리</h2>
          <nav>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="block py-2 hover:text-purple-400 transition-colors">
                  홈
                </Link>
              </li>
              <li>
                <Link to="/users/me" className="block py-2 hover:text-purple-400 transition-colors">
                  마이페이지
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
