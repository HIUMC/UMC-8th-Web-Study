import { useEffect, useState } from "react"
import { getMyInfo } from "../apis/auth"
import { ResponseMyInfoDto } from "../types/auth"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const MyPage = () => {
    const navigate = useNavigate();
    const {logout}= useAuth();
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);

    useEffect(() => {
        const getData = async() => {
            try {
                const response = await getMyInfo();
                console.log(response);
                setData(response);
            } catch (error) {
                console.error("데이터를 가져오는 중 에러 발생:", error);
            }
        };

        getData();
    }, []);

    const handleLogout = async() => {
        await logout();
        navigate("/");
    };

    return <div>
         {data && (
                <>
                    <h1>{data.data?.name}님 환영합니다.</h1>
                    <img src={data.data?.avatar as string} alt={"구글 로고"} />
                    <h1>{data.data?.email}</h1>
                </>
            )}
        <button className='cursor-pointer text-white bg-pink-500 rounded-sm p-5 hover:scale-90'
        onClick={handleLogout}>로그아웃</button>
    </div>;
}

export default MyPage;
