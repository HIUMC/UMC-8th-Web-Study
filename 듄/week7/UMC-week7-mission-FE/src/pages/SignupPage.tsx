import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth";

const schema = z.object({
  email: z.string().email({message: "올바른 이메일 형식이 아닙니다."}),
  password: z
    .string()
    .min(8, {message: "비밀번호는 8자 이상이어야 합니다."})
    .max(20, {message: "비밀번호는 20자 이하여야 합니다."}),
  passwordCheck: z
    .string()
    .min(8, {message: "비밀번호는 8자 이상이어야 합니다."})
    .max(20, {message: "비밀번호는 20자 이하여야 합니다."}),
  name: z
    .string()
    .min(1, {message: "이름을 입력해주세요."}),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFeilds = z.infer<typeof schema>;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<FormFeilds>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFeilds> = async (data) => {
    const {passwordCheck, ...rest} = data; // 데이터 보낼 때 비밀번호확인란 데이터 제외 후 전송

    const response = await postSignup(rest);

    console.log(response);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
    <div className="flex flex-col gap-3">
      <input
        {...register("name")}
        name="name"
        className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
          ${errors.name ? "border-red-500 bg-red-200" : "border-gray-300"}`}
        type="text"
        placeholder="이름"
      />
      {errors.name && (
        <div className="text-red-500 text-sm">{errors.name.message}</div>
      )}

      <input
        {...register("email")}
        name="email"
        className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
        ${errors.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
        type="email"
        placeholder="이메일"
      />
      {errors.email && (
        <div className="text-red-500 text-sm">{errors.email.message}</div>
      )}

      <input
        {...register("password")}
        name="password"
        className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
        ${errors.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
        type="password"
        placeholder="비밀번호"
      />
      {errors.password && (
        <div className="text-red-500 text-sm">{errors.password.message}</div>
      )}

      <input
        {...register("passwordCheck")}
        name="passwordCheck"
        className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
        ${errors.passwordCheck ? "border-red-500 bg-red-200" : "border-gray-300"}`}
        type="password"
        placeholder="비밀번호 확인"
      />
      {errors.password && (
        <div className="text-red-500 text-sm">{errors.password.message}</div>
      )}

      <button
        disabled={isSubmitting} //isSubmitting이 true이면 버튼 비활성화
        type="submit"
        onClick={handleSubmit(onSubmit)}
        className="w-[300px] bg-blue-500 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
      >
        회원가입
      </button>
    </div>
  </div>
  )
};

export default SignupPage;
