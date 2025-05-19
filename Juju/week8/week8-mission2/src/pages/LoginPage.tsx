import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/useForm";
import { UserSigninInformation, validateSignin } from "../utils/validate";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const { login, accessToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            navigate("/")
        }
    }, [accessToken, navigate]);

    const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    });

    const handleSubmit = async () => {
        try {
            await login(values);
            navigate("/my"); // 로그인 성공 시 마이페이지로 이동
        } catch {
            alert("로그인에 실패했습니다."); // 로그인 실패 시 알림
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = import.meta.env.VITE_SERVER_API_URL+"/v1/auth/google/login"; // 구글 로그인 페이지로 리다이렉트
    };


    // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
    const isDisabled = Object.values(errors || {}).some((error : string) => error.length > 0) || Object.values(values).some((value) => value === "");
  
  return <div className="flex flex-col items-center justify-center h-full gap-4">
    <h1 className="text-4xl font-bold mb-8 text-center leading-snug">로그인</h1>
    <div className="flex flex-col gap-3">
        <input
            {...getInputProps("email")}
            name="email"
            className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                ${errors?.email && touched?.email ? "border-red-500" : "border-gray-300"}`}
            type={"email"}
            placeholder={"이메일"}
        />
        {errors?.email && touched?.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        <input
            {...getInputProps("password")}
            className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                ${errors?.password && touched?.password ? "border-red-500" : "border-gray-300"}`}
            type={"password"}
            placeholder={"패스워드"}
        />
        {errors?.password && touched?.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
        )}
        <button
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}
            className="w-full bg-black text-white py-3 rounded-md text-lg font-medium hover:bg-gray-800 transition-colors duration-200 cursor-pointer disabled:bg-gray-300 disabled:bg-gray-300"
        >
            로그인
        </button>
        <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-black text-white py-3 rounded-md text-lg font-medium hover:bg-gray-800 transition-colors duration-200 cursor-pointer disabled:bg-gray-300 disabled:bg-gray-300"
        >
            <div className="flex items-center justify-center gap-2">
                <img
                    className="w-5 h-5"
                    src = {"../../google.svg"}
                    alt="Google 로고이미지"
                />
                <span>구글 로그인</span>
            </div>
        </button>
    </div>
  </div>
}

export default LoginPage
