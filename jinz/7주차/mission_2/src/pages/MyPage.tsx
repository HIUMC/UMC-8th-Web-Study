import { useEffect, useRef, useState } from "react";
import { getMyInfo, updateMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const MyPage = () => {
    const [userInfo, setUserInfo] = useState<ResponseMyInfoDto | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);  

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await getMyInfo();
                setUserInfo(response);
                setBio(response.data.bio ?? '');
                setAvatar(response.data.avatar || '');
                setBio(response.data.bio ?? '');
                console.log('fetchUserInfo 실행됨됨')
            } catch (error) {
                console.error("사용자 정보를 불러오는데 실패했습니다:", error);
            }
        };

        fetchUserInfo();
    }, []);

    const updateMutation = useMutation ({
        mutationFn: updateMyInfo,
        onSuccess: async() => {
            console.log("사용자 정보 수정 성공");
            setIsEditMode(false);
            const update= await getMyInfo();
            setUserInfo(update)
        }
    })

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3 p-6 bg-white rounded-lg shadow-md">
                {userInfo ? (
                    <div className="flex flex-col items-center justify-center relative">
                        {isEditMode ? (
                            <div className="flex flex-row space-between items-center justify-center gap-4">
                            <img 
                                src={userInfo?.data.avatar || ''}
                                onClick={() => {}}
                                className="w-30 h-30 rounded-full cusor-pointer" />
    
                            <div className="flex flex-col gap-2">
                                <input 
                                    type="text" 
                                    value={name}
                                    placeholder="이름" 
                                    className="border border-gray-300 rounded p-2"
                                    defaultValue={userInfo?.data.name}
                                    onChange={(e)=>setName(e.target.value)}
                                />
                                <textarea 
                                    value={bio}
                                    placeholder="자기소개" 
                                    className="border border-gray-300 rounded p-2"
                                    defaultValue={userInfo?.data.bio ?? ""}
                                    onChange={(e)=>setBio(e.target.value)}
                                />
                                <button 
                                    onClick={() => {
                                        updateMutation.mutate({name, bio, avatar})
                                    }} 
                                    className="bg-blue-500 text-white rounded p-2">저장</button>
                            </div>
                        </div>

                        ):(<>
                        <button
                            onClick={() => {
                                setIsEditMode(!isEditMode);
                            }} 
                            className="absolute top-0 right-0"> ⚙️ </button>
                            <div className="flex flex-row space-between items-center justify-center gap-4">
                            <img src={'/sza.jpg'} alt="User Avatar" className="w-30 h-30 rounded-full" />
                            <div className="flex flex-col items-start text-center">
                                <div className="font-semibold text-lg">{userInfo.data.name}</div> 
                                <div>{userInfo.data.email}</div> 
                                <div>{userInfo.data.bio}</div>
                            </div>
                        </div>
                        </>
                            
                        )}
                    </div>
                    
                ) : (
                    <div className="text-center text-gray-500">사용자 정보를 불러오는 중...</div>
                )}
                
            </div>
        </div>
    );
};

export default MyPage;
