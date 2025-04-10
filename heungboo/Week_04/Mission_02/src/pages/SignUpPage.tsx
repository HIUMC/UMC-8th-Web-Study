import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth";
import { ResponseSignupDto } from "../types/auth";

// schema = 유효성 검사를 위함.
// schema => z.object 객체 즉 유효성 검사를 위한 객체임
// key = name ; string 타입, 최소 1 글자 이상. 실패하면 message = "이름을 입력해주세요"

const schema = z
  .object({
    name: z.string().min(1, { message: "이름을 입력해주세요." }),

    password: z
      .string()
      .min(8, { message: "비밀 번호는 8자 이상이여야 합니다." })
      .max(20, { message: "비밀 번호는 20자 이하여야 합니다." }),

    passwordCheck: z
      .string()
      .min(8, { message: "비밀 번호는 8자 이상이여야 합니다." })
      .max(20, { message: "비밀 번호는 20자 이하여야 합니다." }),

    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"], // 이 에러를 passwordCheck 필드에 표시
  });

// z.infer는 schema로부터 자동으로 타입을 추론해서 FormField 타입으로 만들어줌.
type FormField = z.infer<typeof schema>;
// 이걸 이용해서 useForm<FormField> 으로 타입까지 정확하게 관리함 ..

// register: input과 연결하는 함수야. name="email" 같은 걸 대신해줘.
// handleSubmit: 폼 제출을 처리하는 함수. (검사 후 데이터 넘김)

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormField>({
    defaultValues: {
      name: "",
      password: "",
      email: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    console.log(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordCheck, ...rest } = data;
    const response: ResponseSignupDto = await postSignup(rest);
    console.log(response);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...register("email")}
          name="email"
          className={`border border-[#ccc] w-[300px] p-[10px] focus-border-[#807bff] rounded-sm
      ${errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type={"email"}
          placeholder="이메일"
        />
        {errors.email && (
          <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}

        <input
          {...register("password")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus-border-[#807bff] rounded-sm
      ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type={"password"}
          placeholder="비밀번호"
        />
        {errors.password && (
          <div className="text-red-500 text-sm">{errors.password.message}</div>
        )}

        <input
          {...register("passwordCheck")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus-border-[#807bff] rounded-sm
      ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
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
          className={`border border-[#ccc] w-[300px] p-[10px] focus-border-[#807bff] rounded-sm
      ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type={"name"}
          placeholder="이름"
        />
        {errors.name && (
          <div className="text-red-500 text-sm">{errors.name.message}</div>
        )}

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {" "}
          회원가입
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
