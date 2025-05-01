import { useState, useEffect } from "react";
import axios from "axios";
import { useLogin } from "../context/useLogin";

type DataType = {
  accssToken: string;
  id: number;
  name: string;
  refreshToken: string;
};

interface LoginResponseType {
  status: boolean;
  message: string;
  statusCode: number;
  data: DataType;
}

function useLoginFetch(
  url: string,
  email: string,
  password: string,
): LoginResponseType {
  const [data, setData] = useState<LoginResponseType | null>(null);
  const { isLogin, setIsLogin } = useLogin();
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    setIsPending(true);
    const fetchData = async () => {
      try {
        const response = await axios.post(
          url,
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        setData(response.data);

        if (response.data.status === true) {
          setIsLogin(true);
          alert("로그인 성공!");
        } else {
          alert("로그인 실패");
        }
      } catch (error) {
        console.log(error);
        alert("서버 오류 또는 네트워크 오류입니다.");
      } finally {
        setIsPending(false);
      }
    };
    fetchData();
  }, [email, password]);

  return { data, setData, isPending, setIsPending };
}
export default useLoginFetch;
