import { useEffect, useState } from "react"
import { getMyInfo } from "../apis/auth"
import { ResponseMyInfoDto } from "../types/auth"

const MyPage = () => {
    const [data, setData] = useState<ResponseMyInfoDto | null>(null)

    useEffect(() => {
        const getData = async() => {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        };

        getData();
    }, [])

    return <div>{data ? `${data.data.name} ${data.data.email}` : "Loading..."}</div>
}  

export default MyPage