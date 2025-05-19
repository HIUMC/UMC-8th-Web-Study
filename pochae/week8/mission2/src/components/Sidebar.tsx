import { Link } from "react-router-dom";

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
    onRequestDelete: () => void;
};

const Sidebar = ({isOpen, onClose, onRequestDelete}: SidebarProps) => {
    
  return (
    <div className={`absolute top-16 left-0 w-64 h-full bg-black text-white transform 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-300 z-20`}>

        <div className='h-full flex flex-col justify-between p-4'>
            {/* 메뉴 */}
            <ul className="p-4 space-y-4">
                <li>
                    <Link to='/search' 
                        className="flex items-center space-x-2 hover:text-pink-500 cursor:pointer"
                        onClick={onClose}>
                        <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTesnQaIIeKboFJaQ4LtnxKLyvP7RhtLsZUIQ&s"
                        className="w-8 h-8"
                        />
                        <span>찾기</span>
                    </Link>
                </li>
                <li>
                    <Link to='/my' 
                        className="flex items-center space-x-3 hover:text-pink-500 cursor:pointer"
                        onClick={onClose}>
                        <img 
                        src="https://cdn-icons-png.flaticon.com/512/12225/12225935.png"
                        className="w-7 h-7"
                        />
                        <span>마이페이지</span>
                    </Link>
                </li>
            </ul>

            {/* 하단 탈퇴하기 버튼 */}
            <div className='p-4'>
                <button
                    onClick={onRequestDelete}
                    className='hover:text-pink-500 cursor-pointer'
                >
                    탈퇴하기
                </button>
            </div>

        </div>
        
    </div>
  )
}

export default Sidebar
