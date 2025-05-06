import { Link } from "react-router-dom";

const Sidebar = ({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) => {
    return(
        <>
            {/* 오버레이: 모바일에서만, 사이드바 열렸을 때만 */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-5 z-30 md:hidden"
                    onClick={onClose}
                />
            )}
            <aside
                className={`fixed md:static top-0 left-0 h-full w-48 p-4 flex flex-col gap-4 bg-white rounded-lg shadow-md transform ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform md:translate-x-0 z-40`}>
                <Link to=''>검색</Link>
                <Link to='mypage'>마이페이지</Link>    
            </aside>
        </>
    )
}

export default Sidebar;

