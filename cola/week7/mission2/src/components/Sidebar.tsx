import { Link } from 'react-router-dom';
import { FiSearch, FiUser } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <div className="flex flex-col flex-shrink-0 h-full w-50 text-white bg-gray-700 p-5 gap-3">
      <Link
        to={'/search'}
        className="inline-flex items-center gap-2 cursor-pointer"
      >
        <FiSearch className="text-xl" />
        검색
      </Link>
      <Link
        to={'/myinfo'}
        className="inline-flex items-center gap-2 cursor-pointer"
      >
        <FiUser className="text-xl" />
        마이 페이지
      </Link>
    </div>
  );
};

export default Sidebar;
