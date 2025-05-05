import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import axios from "axios";

const MyPage = () => {
    const [userInfo, setUserInfo] = useState<ResponseMyInfoDto | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                console.log('Fetching user info...');
                const response = await getMyInfo();
                console.log('User info response:', response);
                setUserInfo(response);
            } catch (error) {
                console.error("사용자 정보를 불러오는데 실패했습니다:", error);
                if (axios.isAxiosError(error)) {
                    console.error("Error status:", error.response?.status);
                    console.error("Error data:", error.response?.data);
                    console.error("Error headers:", error.response?.headers);
                }
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">마이페이지</h2>
                {userInfo ? (
                    <div className="space-y-4">
                        <div className="text-lg">
                            <span className="font-semibold">이메일:</span> {userInfo.data.email}
                        </div>
                        <div className="text-lg">
                            <span className="font-semibold">닉네임:</span> {userInfo.data.name}
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-500">사용자 정보를 불러오는 중...</div>
                )}
            </div>
        </div>
    );
};

export default MyPage;
