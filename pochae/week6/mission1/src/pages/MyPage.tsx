import { useEffect, useState } from "react"
import { getMyInfo } from "../apis/auth"
import { ResponseMyInfoDto } from "../types/auth"
import { useAuth } from "../context/AuthContext"


const MyPage = () => {
    const {logout}= useAuth();
    const [data, setData] = useState<ResponseMyInfoDto>([]);

    useEffect(() => {
        const getData = async() => {
            const response = await getMyInfo();
            setData(response);
        };

        getData();
    }, []);

    const handleLogout = async() => {
        await logout();
    };

    return <div className='mt-10'>
         <h1>{data.data?.name}님 환영합니다.</h1>
         <img src={data.data?.avatar as string} alt={"구글 로고"} />
         <h1>{data.data?.email}</h1>

         <button 
         onClick={handleLogout}
         className="cursor-pointer text-white bg-pink-500 rounded-sm hover:scale-90 p-4" 
         >
            로그아웃
         </button>
    </div>;
}

export default MyPage;
