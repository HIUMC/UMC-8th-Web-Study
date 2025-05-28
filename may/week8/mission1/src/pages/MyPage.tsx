import { useEffect, useState } from "react";
import { getMyInfo, updateMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import { ResponseMyInfoDto } from "../types/auth";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [intro, setIntro] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await getMyInfo();
            setData(response);
            setName(response.data.name);
            setIntro(`안녕하세요. 저는 ${response.data.name}인데요?.`);
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    const handleSave = async () => {
        // updateMyInfo API가 있다고 가정할 때
        await updateMyInfo({ name, intro }); // intro 필드가 있다고 가정
        setIsEditing(false);
        const updated = await getMyInfo();
        setData(updated);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
            {data && (
                <div className="bg-[#0d1225] p-8 rounded-xl shadow-lg text-center w-[300px]">
                    <img
                        src={data.data?.avatar}
                        alt="Profile"
                        className="w-32 h-32 rounded-full mx-auto mb-4"
                    />
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full mb-2 px-3 py-1 rounded bg-gray-800 text-white"
                            />
                            <textarea
                                value={intro}
                                onChange={(e) => setIntro(e.target.value)}
                                className="w-full mb-2 px-3 py-1 rounded bg-gray-800 text-white"
                            />
                            <button
                                onClick={handleSave}
                                className="bg-green-500 hover:bg-green-600 px-4 py-1 rounded mb-2"
                            >
                                저장
                            </button>
                        </>
                    ) : (
                        <>
                            <h2 className="text-xl font-bold">{data.data.name}</h2>
                            <p className="text-sm mt-1 mb-1">
                                안녕하세요. 저는 {data.data.name}인데요?.
                            </p>
                            <p className="text-xs text-gray-400">
                                {data.data.email}
                            </p>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="mt-3 bg-gray-700 hover:bg-gray-600 text-sm px-3 py-1 rounded"
                            >
                                수정
                            </button>
                        </>
                    )}
                </div>
            )}
            <button
                onClick={handleLogout}
                className="mt-6 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded"
            >
                로그아웃
            </button>
        </div>
    );
};

export default MyPage;
