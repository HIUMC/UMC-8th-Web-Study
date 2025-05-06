// Removed unused import

import useForm from "../hooks/useForm";
import { UserSigninInformation, validateSignin } from "../utils/validate";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();

  // login 상태 일 때 로그인 페이지 접근 시 홈으로 이동
  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [navigate, accessToken]);

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValues: { email: "", password: "" },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    try {
      await login(values);
    } catch (error) {
      console.error("로그인 오류", error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  const isDisabled =
    Object.values(errors || {}).some((error: string) => error.length > 0) ||
    Object.values(values).some((value: string) => value == "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${
              errors?.email && touched?.email
                ? "border-red-500 bg-red-200"
                : "border-gray-300"
            }`}
          type={"email"}
          placeholder="이메일을 입력하세요"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500">{errors.email}</div>
        )}

        <input
          {...getInputProps("password")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                ${
                  errors?.password && touched?.password
                    ? "border-red-500 bg-red-200"
                    : "border-gray-300"
                }`}
          type={"password"}
          placeholder="비밀번호를 입력하세요"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500">{errors.password}</div>
        )}

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300 duration-200"
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          로그인
        </button>

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300 duration-200"
          type="button"
          onClick={handleGoogleLogin}
          // disabled={isDisabled}
        >
          <div>
            <img
              src="/public/google.png"
              alt="Google"
              className="w-5 h-5 inline-block mr-2"
            />
            <span>구글 로그인</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
