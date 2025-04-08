import {useState}  from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"; 
import {SubmitHandler, useForm} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, signUpSchema } from "../utils/signUpSchema";
import { postSignup } from "../apis/auth";





const SingupPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  }= useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  })
  
  
  const [step, setStep] =useState<"email"|"password"|"name">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit : SubmitHandler<FormData> = async(data: FormData) => {
    const {name, email, password} = data;
    try { 
      const response = await postSignup({name, email, password});
      console.log("회원가입 요청 데이터:", response);
    } catch (error) {
      console.error("회원가입 실패:", error);
      console.log("요청한 URL:", error?.config?.baseURL + error?.config?.url);
    }
    
  }

  console.log("errors.passwordConfirm", errors.passwordConfirm)

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <h3 className='text-xl font-bold text-center'>회원가입</h3>

        {step === "email" && (
          <>
            <input
              {...register("email")}
            placeholder="이메일의 자리입니다..."
            className={`border border=[#ccc] w-[300px] p-[10px] focus:border=[#807bff] rounded-sm
              ${errors.email ? "border-red-500 bg-red-100" : "border-gray-300"}`}
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}
            <button
              type="button"
              disabled={!!errors.email}
              onClick={() => setStep("password")}
              className="w-[300px] bg-blue-600 text-white py-3 rounded-md text-lg font-midium hover:bg-blue-700 transition-colors cusor-pointer disabled:bg-gray-300"
            >
              다음
            </button>
          </>
        )}

        {step === "password" && (
          <>
            <div className='relative'>
            <div className="text-gray-500 text-lg text-center">📧{watch("email")}</div>
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
            </div>
            {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}

            <div className="relative">
              <input
                {...register("passwordConfirm")}
                placeholder="비밀번호 확인"
                type={showConfirm ? "text" : "password"}
                className={`border border=[#ccc] w-[300px] p-[10px] focus:border=[#807bff] rounded-sm
                  ${errors.passwordConfirm ? "border-red-500 bg-red-100" : "border-gray-300"}`}
              />
              <span onClick={() => setShowConfirm((p) => !p)} 
                className="absolute right-2 top-3 cursor-pointer">
                {showConfirm ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
            {errors.passwordConfirm && <div className="text-red-500 text-sm">{errors.passwordConfirm.message}</div>}
            
            <button
              type="button"
              disabled={
                !!errors.password ||
                !!errors.passwordConfirm ||
                !watch("password") ||
                !watch("passwordConfirm")
              }
              onClick={() => setStep("name")}
              className="w-[300px] bg-blue-600 text-white py-3 rounded-md text-lg font-midium hover:bg-blue-700 transition-colors cusor-pointer disabled:bg-gray-300"
            >

              다음
            </button>

          </>
        )}

        {step === "name" && (
          <>
            <input
              {...register("name")}
              placeholder="닉네임의 자리..."
              className={`border border=[#ccc] w-[300px] p-[10px] focus:border=[#807bff] rounded-sm
                ${errors.name ? "border-red-500 bg-red-100" : "border-gray-300"}`}
            />
            {errors.name && <div className="text-red-500 text-sm">{errors.name.message}</div>}

            <button
              type="button"
              disabled={!!errors.name}
              onClick={() => handleSubmit(onSubmit)()}
              className="w-[300px] bg-blue-600 text-white py-3 rounded-md text-lg font-midium hover:bg-blue-700 transition-colors cusor-pointer disabled:bg-gray-300"
            >
              회원가입 완료~
            </button>
          </>
        )}
          
        
          
          </div>
      </div>
  );
}

export default SingupPage;