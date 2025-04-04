import { useState } from "react";
import { UserSigninInformation, validateSignin } from "../utils/validate";
import useForm from "../hooks/useForm";

const LoginPage = () => {
  const [formValues, setFromValues] = useState<UserSigninInformation>({
    email: "",
    password: "",
  });
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleChange = (name: string, text: string) => {
    setFromValues({
      ...formValues,
      [name]: text,
    });
  };

  const handleSubmit = async () => {
    console.log(values);
  };
  //에러가 하나라도 있거나, 입력값이 비었으면 disabled 처리
  const isDisabled = () =>
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          name="email"
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.email && touched.email ? "border-red-500 bg-red-200 " : "border-gray-300"}`}
          type={"email"}
          placeholder="email"
        ></input>
        {errors?.email && touched.email && (
          <div className="text-red-500">{errors.email}</div>
        )}
        <input
          {...getInputProps("password")}
          name="password"
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.password && touched.password ? "border-red-500 bg-red-200 " : "border-gray-300"}`}
          type={"password"}
          placeholder="password"
        ></input>
        {errors?.password && touched.password && (
          <div className="text-red-500">{errors.password}</div>
        )}
        <button
          disabled={isDisabled()}
          type="button"
          onClick={handleSubmit}
          className="w-full bg-pink-600 text-white p-[10px] rounded-sm hover:bg-pink-400 transition-colors duration-200 cursor-pointer disabled:bg-[#ccc] disabled:cursor-not-allowed"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
//ㅇㅠㅎㅛㅅㅓㅇ ㄱㅓㅁㅅㅏㄷㅗ ㅎㅐㅈㅜㄴㅡㄴ ㄱㅓㅅㅇㅣ ㅁㅐㅇㅜ ㅈㅗㅎㅇㅡㅁ
