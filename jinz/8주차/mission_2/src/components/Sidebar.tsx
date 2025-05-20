import { useState } from "react";
import { Link } from "react-router-dom";
import { delemteMyAccount } from "../apis/auth";

const Sidebar = ({isOpen, onClose, onSearchClick}: {isOpen: boolean, onClose: () => void, onSearchClick: () => void}) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDeleteAccount = async () => {
        try {
            const response = await delemteMyAccount();
            console.log('탈퇴 성공:', response);
        }catch (error) {
            console.error('탈퇴 실패:', error);
        }
    }



    return(
        <>
            {/* 오버레이: 모바일에서만, 사이드바 열렸을 때만 */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 md:hidden"
                    onClick={onClose}
                />
            )}
            <aside
                className={`fixed md:static top-0 left-0 h-full w-48 p-4 flex flex-col items-center gap-4 bg-white rounded-lg shadow-md transform ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform md:translate-x-0 z-40`}>
                <button onClick={() => {
                    console.log('검색 버튼 클릭됨됨')
                    onSearchClick()}}>검색</button>
                <Link to='mypage'>마이페이지</Link>
                <button onClick={()=>setIsDeleteModalOpen(true)}>탈퇴하기</button>
            </aside>
            {isDeleteModalOpen && (
                    <div className="fixed inset-50 flex flex-col items-center justify-center bg-gray-300 rounded-lg shadow-md z-50 p-4">
                        <button
                            onClick={() => setIsDeleteModalOpen(false)} 
                            className="absolute top-2 right-3"> 
                            ✖ </button>
                        <h1 className="text-lg font-semibold mb-4">정말 탈퇴하시겠습니까?</h1>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => {handleDeleteAccount()}}
                                className="w-20 h-10 px-4 bg-gray-500 text-white text-sm rounded mb-4">예</button>
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="w-20 h-10 px-4 bg-gray-500 text-white text-sm rounded mb-4">아니요</button>    
                        </div>
                    </div>
                )
                } 
        </>
    )
}

export default Sidebar;

