import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../utils/loginSchema" 
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const LoginPage = () => {
    const navigate = useNavigate();
    const {login} = useAuth();

    const {
      register,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
      mode: "onChange",
    });
  
    const onSubmit : SubmitHandler<LoginFormData> = async (data: LoginFormData) => {
      try{
        await login(data);
        // 토큰 저장 확인
        const storedToken = localStorage.getItem('accessToken');
        console.log('Stored token:', storedToken);
        navigate('/mypage') // 로그인 성공시 홈으로 이동
      } catch (error) {
        console.error("로그인 실패:", error);
      }
      
    };

    const [showPassword, setShowPassword] = useState(false);

    return(
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3">
                <h3 className='text-xl font-bold text-center'>로그인</h3>
                <input
                {...register("email")}
                placeholder="이메일의 자리입니다..."
                className={`border border=[#ccc] w-[300px] p-[10px] focus:border=[#807bff] rounded-sm
                ${errors.email ? "border-red-500 bg-red-100" : "border-gray-300"}`}/>
                {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}
                
                <input
                {...register("password")}
                placeholder="비밀번호의 자리입니다..."
                type={showPassword ? "text" : "password"}
                className={`border border=[#ccc] w-[300px] p-[10px] focus:border=[#807bff] rounded-sm
                    ${errors.password ? "border-red-500 bg-red-100" : "border-gray-300"}`}
                />
                
                <span onClick={() => setShowPassword((p) => !p)} 
                    className="absolute right-2 top-3 cursor-pointer">
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
                {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}
                <button
                type="button"
                disabled={!!errors.email || !!errors.password || !isValid}
                onClick={() => handleSubmit(onSubmit)()}
                className="w-[300px] bg-blue-600 text-white py-3 rounded-md text-lg font-midium hover:bg-blue-700 transition-colors cusor-pointer disabled:bg-gray-300"
                >
                로그인~
                </button>
            </div>
        </div>

    )
}

export default LoginPage;

