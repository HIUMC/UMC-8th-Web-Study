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
                        찾기
                    </Link>
                </li>
                <li>
                    <Link to='/my' 
                        className="flex items-center space-x-2 hover:text-pink-500 cursor:pointer"
                        onClick={onClose}>
                        <img 
                        src="https://previews.123rf.com/images/alekseyvanin/alekseyvanin1705/alekseyvanin170503743/78500440-%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%82%AC%EB%9E%8C-%EC%84%A0-%EC%95%84%EC%9D%B4%EC%BD%98-%ED%9D%B0%EC%83%89-%EA%B0%9C%EC%9A%94-%EA%B8%B0%ED%98%B8-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4%EC%85%98.jpg"
                        className="w-7 h-7"
                        />
                        마이페이지
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
