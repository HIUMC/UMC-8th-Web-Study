import { useEffect, useState } from "react"
import { getMyInfo } from "../apis/auth"
import { ResponseMyInfoDto } from "../types/auth"
import { useAuth } from "../context/AuthContext"
import useMyFix from "../hooks/mutations/useMyFix"

const MyPage = () => {
    const {logout}= useAuth();
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    const [ isEditMode, setIsEditMode ] = useState(false);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState("");

    const{mutate} = useMyFix();

    useEffect(() => {
        const getData = async() => {
            const response = await getMyInfo();
            setData(response);
            setName(response.data.name);        
            setBio(response.data.bio ?? "");
            setAvatar(response.data.avatar ?? "");
        };

        getData();
    }, []);

    // 로그아웃 함수
    const handleLogout = async() => {
        await logout();
    };

    // 프로필 수정
    const handleFix = () => {
        if (name.trim()===""){
            alert("이름은 비워둘 수 없습니다");
            return;
        }
        mutate({name, bio, avatar},
            {
                onSuccess:() => {
                    setIsEditMode(false);
                }
            }
        );
    }

    return (
        <div className='bg-black'>
            <div className='mt-7 ml-64 bg-gray-900 min-h-screen text-white p-6'>
                <h1 className='p-4'>{data?.data?.name}님 환영합니다.</h1>
                <img src={data?.data?.avatar || "https://bincan.co/common/img/default_profile.png"}
                    alt={"프로필"} 
                    className='rounded-full w-20 h-20'
                />
                <h1 className='p-4'>{data?.data?.email}</h1>
                <h1 className="p-4">{data?.data?.bio}</h1>

                {/* 설정 버튼 */}
                <button onClick={()=> setIsEditMode(!isEditMode)}
                    className='px-4 py-2 bg-pink-500 rounded-sm hover:scale-90 cursor-pointer'>
                    {isEditMode ? "취소" : "설정"}
                </button>

                {/* 설정 모드일 때만 보이는 폼 */}
                {isEditMode && (
                    <div className="space-y-4 p-2">
                        <div>
                            <label className="block mb-1 font-bold">이름</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-50 p-2 text-white"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-bold">소개 (bio)</label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="w-80 p-2 text-white"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-bold">아바타 URL</label>
                            <input
                                value={avatar}
                                onChange={(e) => setAvatar(e.target.value)}
                                className="w-80 p-2 text-white"
                            />
                        </div>

                        <button
                            onClick={handleFix}
                            className="px-4 py-2 bg-pink-500 rounded-sm hover:scale-90 cursor-pointer"
                        >
                            수정 완료
                        </button>
                    </div>
                )}

                {/* 로그아웃 버튼 */}
                <button 
                onClick={handleLogout}
                className="flex bottom-4 left-1/2 mt-2 cursor-pointer text-white bg-pink-500 rounded-sm hover:scale-90 p-4" 
                >
                    로그아웃
                </button>
            </div>;
        </div>
    )
}

export default MyPage;
