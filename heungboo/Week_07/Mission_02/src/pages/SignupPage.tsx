import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResponseSignupDto } from "../types/auth";
import { postSignup } from "../apis/auth";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 최대 20자까지 가능합니다." }),

    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 최대 20자까지 가능합니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordCheck, ...rest } = data;
      const response: ResponseSignupDto = await postSignup(rest);
      alert("회원가입을 성공했습니다 !");
      console.log("회원 가입 성공 : ", response);
      console.log(response);
    } catch (error) {
      console.error("회원 가입 실패 : ", error);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요 !");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...register("email")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
          ${errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type={"email"}
          placeholder="이메일을 입력하세요"
        />
        {errors.email && (
          <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}

        <input
          {...register("password")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
              ${
                errors?.password
                  ? "border-red-500 bg-red-200"
                  : "border-gray-300"
              }`}
          type={"password"}
          placeholder="비밀번호를 입력하세요"
        />
        {errors.password && (
          <div className="text-red-500 text-sm">{errors.password.message}</div>
        )}

        <input
          {...register("passwordCheck")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
              ${
                errors?.passwordCheck
                  ? "border-red-500 bg-red-200"
                  : "border-gray-300"
              }`}
          type={"password"}
          placeholder="비밀번호 확인"
        />
        {errors.passwordCheck && (
          <div className="text-red-500 text-sm">
            {errors.passwordCheck.message}
          </div>
        )}

        <input
          {...register("name")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
              ${
                errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"
              }`}
          type={"text"}
          placeholder="이름을 입력하세요"
        />
        {errors.name && (
          <div className="text-red-500 text-sm">{errors.name.message}</div>
        )}

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300 duration-200"
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
