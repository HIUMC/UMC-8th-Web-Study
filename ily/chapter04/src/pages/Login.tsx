import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { useLogin } from "../context/useLogin";

type Data = {
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
};

type ResponseData = {
  status: boolean;
  message: string;
  statusCode: number;
  data: Data;
};

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [data, setIsData] = useState<ResponseData | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { isLogin, setIsLogin } = useLogin();

  //로그인 할 때 @가 없을 떄 에러를 일으키기 위한 state
  const [emailError, setEmailError] = useState<boolean>(false);

  //비밀번호가 8자 이하면 에러 일으키기 위한 state
  const [passwordError, setPasswordError] = useState<boolean>(false);

  //올바른 이메일 비밀번호 설정
  const [isValid, setIsValid] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      LoginHandler();
    }
  };
  useEffect(() => {
    if (!emailError && !passwordError) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [emailError, passwordError]);

  //로그인 핸들러
  const LoginHandler = async () => {
    if (!isValid) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    setIsLogin(false);
    try {
      setIsPending(true);
      const response = await axios.post(
        "http://localhost:8000/v1/auth/signin",
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

      setIsData(response.data);
      console.log(data);
      setIsLogin(true);
      console.log(isLogin);
    } catch (error) {
      if (data?.status !== true || error) {
        alert("로그인에 실패했습니다.");
        setIsPending(false);
      }
    } finally {
      if (data?.status === true) {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        console.log(data.data.accessToken);
        setIsPending(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-screen">
      <div className="flex flex-col items-center w-full max-w-md">
        <div className="grid grid-cols-3 items-center w-full px-4 py-2">
          <div className="justify-self-start">
            <Link to="/" className="text-2xl">
              &lt;
            </Link>
          </div>
          <h1 className="justify-self-center text-xl font-semibold">로그인</h1>
          <div />
        </div>
        {/* 버튼 및 입력 필드 */}
        <div className="mt-10 flex flex-col w-full items-center justify-center">
          <Link
            to=""
            className="mb-5 btn-class border-2 border-black-500 rounded-md p-2 w-1/2 text-center hover:bg-gray-200"
          >
            구글 로그인
          </Link>
          <div>----------OR----------</div>
          <input
            className="border-2 border-black-500 rounded-md p-2 w-1/2 mt-5"
            placeholder="이메일을 입력해주세요."
            type="email"
            ref={emailRef}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              if (e.target.value.includes("@")) {
                setEmailError(false);
              } else if (e.target.value === "") {
                setEmailError(false);
              } else {
                setEmailError(true);
              }
            }}
          />
          {emailError && (
            <div className="text-red-500">올바른 이메일을 입력하세요!</div>
          )}
          <input
            className="border-2 border-black-500 rounded-md p-2 w-1/2 mt-2"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            ref={passwordRef}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              if (e.target.value.length >= 8) {
                setPasswordError(false);
              } else {
                setPasswordError(true);
              }
            }}
          />
        </div>
        {passwordError && (
          <div className="text-red-500">비밀번호를 8글자 이상 입력하세요!</div>
        )}
        <button
          onClick={LoginHandler}
          disabled={!isValid}
          className={`mt-2 rounded-md p-2 w-1/2 text-center
            ${isValid ? "border-black-500 text-black border-2 hover:bg-gray-200" : "border-gray-400 text-gray-400 bg-gray-100 cursor-not-allowed"}
          `}
        >
          로그인
        </button>

        <div className="mt-4">
          {isPending && (
            <>
              <LoadingSpinner />
              <div>엔터를 한 번 더 눌러주세요 </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
