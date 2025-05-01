import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "at least 8 letters" })
      .max(20, { message: "at most 20 letters" }),
    passwordCheck: z
      .string()
      .min(8, { message: "at least 8 letters" })
      .max(20, { message: "at most 20 letters" }),
    name: z.string().min(1, { message: "이름을 입력하세요" }),
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
      passwordCheck: "",
    },

    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col">
        <input
          {...register("email")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.email ? "border-red-500 bg-red-200 " : "border-gray-300"}`}
          type={"email"}
          placeholder="email"
        ></input>
        {errors?.email && (
          <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}

        <input
          {...register("password")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.password ? "border-red-500 bg-red-200 " : "border-gray-300"}`}
          type={"password"}
          placeholder="password"
        ></input>
        {errors?.password && (
          <div className="text-red-500 text-sm">{errors.password.message}</div>
        )}

        <input
          {...register("passwordCheck")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.passwordCheck ? "border-red-500 bg-red-200 " : "border-gray-300"}`}
          type={"password"}
          placeholder="passwordCheck"
        ></input>
        {errors?.passwordCheck && (
          <div className="text-red-500 text-sm">
            {errors.passwordCheck.message}
          </div>
        )}

        <input
          {...register("name")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.name ? "border-red-500 bg-red-200 " : "border-gray-300"}`}
          type={"name"}
          placeholder="name"
        ></input>

        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-pink-600 text-white p-[10px] rounded-sm hover:bg-pink-400 transition-colors duration-200 cursor-pointer disabled:bg-[#ccc] disabled:cursor-not-allowed"
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
