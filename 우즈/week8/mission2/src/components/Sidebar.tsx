import { Link } from "react-router-dom";

// Sidebar 컴포넌트 props 타입 정의
type SidebarProps = {
  isOpen: boolean; // 사이드바가 열렸는지 여부
  onHoverChange: (hovered: boolean) => void; // 마우스 진입/이탈 시 상태를 변경하는 함수
};

const Sidebar = ({ isOpen, onHoverChange }: SidebarProps) => {
  return (
    <div
      // 마우스가 사이드바 영역에 들어가면 isOpen = true
      // 나가면 isOpen = false
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      className={`fixed top-0 left-0 h-full z-30 
        bg-gray-100 dark:bg-gray-800 shadow-md 
        transition-transform duration-300 w-64
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* 상단 메뉴 타이틀 */}
      <div className="p-4 text-lg font-bold text-gray-900 dark:text-white">
        메뉴
      </div>

      {/* 메뉴 항목들 */}
      <nav className="flex flex-col space-y-4 px-4 text-gray-800 dark:text-gray-200">
        <Link to="/">홈</Link>
        <Link to="/my">마이 페이지</Link>
        <Link to="/search">검색</Link>
        <Link to="/login">로그인</Link>
        <Link to="/signup">회원가입</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
