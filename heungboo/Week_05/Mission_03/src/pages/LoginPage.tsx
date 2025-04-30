// Removed unused import
import React from "react";
import { postSignin } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import useForm from "../hooks/useForm";
import { useLocalStorage } from "../hooks/uselocalStorage";
import { ResponseSigninDto } from "../types/auth";
import { UserSigninInformation, validateSignin } from "../utils/validate";

const LoginPage = () => {
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValues: { email: "", password: "" },
      validate: validateSignin,
    });
  //   const [formValues, setFormvalues] = useState({ email: "", password: "" });

  const handleSubmit = async () => {
    try {
      const response: ResponseSigninDto = await postSignin(values);
      setItem(response.data.accessToken);
      console.log(response);
    } catch (error) {
      alert(error?.message);
    }
  };
  const isDisabled =
    Object.values(errors || {}).some((error: string) => error.length > 0) ||
    Object.values(values).some((value: string) => value == "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${
              errors?.email && touched?.email
                ? "border-red-500 bg-red-200"
                : "border-gray-300"
            }`}
          type={"email"}
          placeholder="이메일을 입력하세요"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500">{errors.email}</div>
        )}

        <input
          {...getInputProps("password")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                ${
                  errors?.password && touched?.password
                    ? "border-red-500 bg-red-200"
                    : "border-gray-300"
                }`}
          type={"password"}
          placeholder="비밀번호를 입력하세요"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500">{errors.password}</div>
        )}

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300 duration-200"
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
