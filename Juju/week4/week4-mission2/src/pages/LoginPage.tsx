import useForm from "../hooks/useForm";
import { UserSigninInformation, validateSignin } from "../utils/validate";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    });

    const handleSubmit = () => {
        console.log(values);
    };


    // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
    const isDisabled = Object.values(errors || {}).some((error : string) => error.length > 0) || Object.values(values).some((value) => value === "");
  
  return <div className="flex flex-col items-center justify-center h-full gap-4">
    <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-lg text-black hover:text-gray-500 
             cursor-pointer px-4 py-2 rounded-md transition-all"
    >
        뒤로가기
    </button>
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
        
    </div>
  </div>
}

export default LoginPage
