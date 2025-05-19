import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import {z} from 'zod';
import { postSignup } from '../apis/auth';

const schema = z.object ({
  email: z
  .string()
  .email({message: "올바른 이메일 형식이 아닙니다."}),
  password: z
  .string()
  .min(8, {
    message: "패스워드는 8자 이상이어야 합니다",
  })
  .max(20, {
    message: "패스워드는 20자 이하여야 합니다",
  }),
  passwordCheck: z
  .string()
  .min(8, {
    message: "패스워드는 8자 이상이어야 합니다",
  })
  .max(20, {
    message: "패스워드는 20자 이하여야 합니다",
  }),
  name: z
  .string()
  .min(1, { 
    message: "이름을 입력해주세요."
  }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "패스워드가 일치하지 않습니다.",
    path: ["passwordCheck"],
});

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
   } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFields> = async(data) => {
    const { ...rest } = data;
    const response = await postSignup({ ...rest, bio: "", avatar: "" });
    console.log(response); // Log the response to use the variable
  };

  return <div className="flex flex-col items-center justify-center h-full gap-4">
    <h1 className="text-4xl font-bold mb-8 text-center leading-snug">회원가입</h1>
    <div className="flex flex-col gap-3">
      <input
          {...register("email")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
              ${errors?.email ? "border-red-500" : "border-gray-300"}`}
          type={"email"}
          placeholder={"이메일"}
      />
      {errors.email && (
        <div className={'text-red-500 text-sm'}>
          {errors.email.message}
        </div>
      )}

      <input
          {...register("password")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
              ${errors?.password ? "border-red-500" : "border-gray-300"}`}
          type={"password"}
          placeholder={"패스워드"}
      />
      {errors.password && (
        <div className={'text-red-500 text-sm'}>
          {errors.password.message}
        </div>
      )}

      <input
          {...register("passwordCheck")}  
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
              ${errors?.password ? "border-red-500" : "border-gray-300"}`}
          type={"password"}
          placeholder={"패스워드 확인"}
      />
      {errors.passwordCheck && (
        <div className={'text-red-500 text-sm'}>
          {errors.passwordCheck.message}
        </div>
      )}


      <input
          {...register("name")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
              ${errors?.password ? "border-red-500" : "border-gray-300"}`}
          type={"text"}
          placeholder={"이름"}
      />
      {errors.name && (
        <div className={'text-red-500 text-sm'}>
          {errors.name.message}
        </div>
      )}

      <button
          disabled={isSubmitting}
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-black text-white py-3 rounded-md text-lg font-medium hover:bg-gray-800 transition-colors duration-200 cursor-pointer disabled:bg-gray-300 disabled:bg-gray-300"
      >
        회원가입
      </button>
  </div>
  </div>
}

export default SignupPage
