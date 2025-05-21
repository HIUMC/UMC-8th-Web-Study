import { validateSignin, UserSigninInformation } from "../utils/vaildate.ts";
import useForm from "../hooks/useForm.ts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import { useEffect } from "react";

const LoginPage = () => {
  const { login, accessToken } = useAuth();

  useEffect(() => {
    if (accessToken) {
      navigate("/home");
    }
  }, [login, accessToken]);

  const navigate = useNavigate();
  const { values, errors, touched, getInputProps } =
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

  //구글 로그인 활성화 핸들러
  const handlerGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_BASE_URL + "/v1/auth/google/login";
  };

  // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) || // 오류가 있으면 true
    Object.values(values).some((value) => value === ""); // 입력값이 비어 있으면 true

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-lg text-white bg-blue-500 hover:bg-blue-600 
             cursor-pointer px-4 py-2 rounded-md shadow-md transition-all"
      >
        &lt; 뒤로가기
      </button>
      <div className={"flex flex-col gap-3"}>
        <input
          {...getInputProps("email")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.email && touched?.email
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          type={"email"}
          placeholder="이메일"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        <input
          {...getInputProps("password")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.password && touched?.password
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          type={"password"}
          placeholder="비밀번호"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-blue-600 text-white py-3 
          rounded-md text-lg font-medium hover:bg-blue-700
          transition-colors cursor-pointer disabled:bg-gray-300
          "
        >
          로그인
        </button>
        <button
          type="button"
          onClick={handlerGoogleLogin}
          className="w-full bg-blue-600 text-white py-3 
          rounded-md text-lg font-medium hover:bg-blue-700
          transition-colors cursor-pointer disabled:bg-gray-300
          "
        >
          <div className="flex items-center justify-center gap-2">
            <img src={"/google.svg"} />
            <span>구글 로그인</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
