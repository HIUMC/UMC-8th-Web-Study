import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/useForm";
import { UserSigninInformation, validateSignin } from "../utils/validate";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {login, accessToken} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(accessToken) {
      navigate("/");
    }
  }, [navigate, accessToken]);

  const {values, errors, touched, getInputProps} =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    await login(values);
  };

  const handleGoogleLogin = async () => {
    window.location.href = 
    `http://localhost:8000/v1/auth/google/login`;
  };

  // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
  const isDisabled =
    Object.values(errors).some((error) => error.length >0) || // 오류가 있으면 true
    Object.values(values).some((value) => value.length === 0); // 입력값이 비어있으면 true

  return(
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          name="email"
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors.email && touched.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type="email"
          placeholder="이메일"
        />

        {errors.email && touched.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        <input
          {...getInputProps("password")}
          name="password"
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
          ${errors.password && touched.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type="password"
          placeholder="비밀번호"
        />
        {errors.password && touched.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-[300px] bg-blue-500 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          로그인
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-[300px] bg-blue-500 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          <div className="flex items-center justify-center gap-1">
            <img src="/images/googlelogo.png" alt="Google Logo Image" className="w-8 h-8" />
            <span>구글 로그인</span>
          </div>
        </button>
      </div>
    </div>
  )
};

export default LoginPage;
