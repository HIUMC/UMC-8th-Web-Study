import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignUp } from "../apis/auth";
import { useState } from "react";

const schema = z
  .object({
    email: z.string().email({ message: "이메일 형식이 올바르지 않습니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
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

  const onSubmit = async (data: FormFields) => {
    console.log(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordCheck, ...rest } = data;
    const response = await postSignUp(rest);
    console.log(response);
  };

  const navigate = useNavigate();

  const handleNext = async () => {
    if (step === 1) {
      const isValid = await trigger("email");
      if (isValid) setStep(2);
    } else if (step === 2) {
      const isValid = await trigger(["password", "passwordCheck"]);
      if (isValid) setStep(3);
    }
  };

  const isStepValid = () => {
    const email = watch("email");
    const password = watch("password");
    const passwordCheck = watch("passwordCheck");
    const name = watch("name");

    if (step === 1) {
      return email && !errors.email;
    } else if (step === 2) {
      return (
        password && passwordCheck && !errors.password && !errors.passwordCheck
      );
    } else if (step === 3) {
      return name && !errors.name;
    }
    return false;
  };

  return (
    <div className="flex items-center justify-center bg-black">
      <div className="w-80 flex flex-col items-center pt-30 text-xl bg-black h-screen gap-10">
        <div className="relative w-full flex flex-row items-center">
          <button
            className="absolute left-0 p-4 text-white cursor-pointer"
            onClick={() => navigate(-1)}
          >{`<`}</button>
          <h1 className="text-xl font-bold text-white mx-auto">회원가입</h1>
        </div>
        <div className="flex flex-col gap-5 text-base w-80">
          {step === 1 && (
            <>
              <button className="border-1 border-white rounded-md p-2 text-white cursor-pointer">
                구글 로그인
              </button>

              <div className="flex flex-row items-center">
                <hr className="flex-grow border-1 border-white" />
                <span className="text-sm mx-13 text-white">OR</span>
                <hr className="flex-grow border-1 border-white" />
              </div>

              <input
                {...register("email")}
                name="email"
                type="email"
                className="bg-gray-900 border-1 border-gray-400 rounded-md p-2 text-gray-400"
                placeholder="이메일을 입력해주세요!"
              />
              {errors.email && (
                <div className="text-sm text-red-500">
                  {errors.email.message}
                </div>
              )}
              <button
                className="bg-pink-500 text-white rounded-md p-2 cursor-pointer disabled:bg-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                onClick={handleNext}
                disabled={!isStepValid()}
              >
                다음
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="text-white">📧 {watch("email")}</div>
              <div className="relative">
                <input
                  {...register("password")}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="bg-gray-900 border-1 border-gray-400 rounded-md p-2 text-gray-400 w-full pr-10"
                  placeholder="비밀번호를 입력해주세요!"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.password && (
                <div className="text-sm text-red-500">
                  {errors.password.message}
                </div>
              )}

              <div className="relative">
                <input
                  {...register("passwordCheck")}
                  name="passwordCheck"
                  type={showPasswordCheck ? "text" : "password"}
                  className="bg-gray-900 border-1 border-gray-400 rounded-md p-2 text-gray-400 w-full pr-10"
                  placeholder="비밀번호를 다시 입력해주세요!"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2 text-gray-400"
                  onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                >
                  {showPasswordCheck ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.passwordCheck && (
                <div className="text-sm text-red-500">
                  {errors.passwordCheck.message}
                </div>
              )}
              <button
                className="bg-pink-500 text-white rounded-md p-2 cursor-pointer disabled:bg-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                onClick={handleNext}
                disabled={!isStepValid()}
              >
                다음
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  {...register("name")}
                  type="text"
                  className="bg-gray-900 border-1 border-gray-400 rounded-md p-2 text-gray-400 w-full text-center"
                  placeholder="이름을 입력해주세요!"
                />
                {errors.name && (
                  <div className="text-sm text-red-500">
                    {errors.name.message}
                  </div>
                )}
                <button
                  className="bg-pink-500 text-white rounded-md p-2 cursor-pointer w-full disabled:bg-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                  onClick={handleSubmit(onSubmit)}
                  disabled={!isStepValid()}
                >
                  회원가입 완료
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
