import { useNavigate } from "react-router-dom";
import { UserLoginInformation, validateLogin } from "../utils/validate";
import useForm from "../hooks/useForm";

const LogInPage = () => {
  const { values, touched, errors, getInputProps } =
    useForm<UserLoginInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateLogin,
    });
  const navigate = useNavigate();

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) || // 오류가 있으면 true
    Object.values(values).some((value) => value === ""); // 입력값이 없으면 true

  const handleSubmit = () => {
    console.log(values);
  };

  return (
    <div className="flex items-center justify-center bg-black">
      <div className="w-80 flex flex-col items-center pt-30 text-xl bg-black h-screen gap-10">
        <div className="relative w-full flex flex-row items-center">
          <button
            className="absolute left-0 p-4 text-white cursor-pointer"
            onClick={() => navigate(-1)}
          >{`<`}</button>
          <h1 className="text-xl font-bold text-white mx-auto">로그인</h1>
        </div>
        <div className="flex flex-col gap-5 text-base w-80">
          <button className="border-1 border-white rounded-md p-2 text-white cursor-pointer">
            구글 로그인
          </button>

          <div className="flex flex-row items-center">
            <hr className="flex-grow border-1 border-white" />
            <span className="text-sm mx-13 text-white">OR</span>
            <hr className="flex-grow border-1 border-white" />
          </div>

          <input
            {...getInputProps("email")}
            name="email"
            type="email"
            className="bg-gray-900 border-1 border-gray-400 rounded-md p-2 text-gray-400"
            placeholder="이메일을 입력해주세요!"
          ></input>
          {errors?.email && touched?.email && (
            <div className="text-sm text-red-500">{errors.email}</div>
          )}
          <input
            {...getInputProps("password")}
            name="password"
            type="password"
            className="bg-gray-900 border-1 border-gray-400 rounded-md p-2 text-gray-400"
            placeholder="비밀번호를 입력해주세요!"
          ></input>
          {errors?.password && touched?.password && (
            <div className="text-sm text-red-500">{errors.password}</div>
          )}
          <button
            className="bg-pink-500 text-white rounded-md p-2 cursor-pointer disabled:bg-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed"
            disabled={isDisabled}
            onClick={handleSubmit}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
