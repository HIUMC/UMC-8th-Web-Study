import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { UserSigninInformation, validateUser } from "../utils/validate";
import { postLogin } from "../apis/auth";
import { LocalStorageKey } from "../constants/key";




export default function LoginPage() {
  
  const navigate = useNavigate();
  const {values,errors,touched,getInputProps,isValid} = useForm<UserSigninInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateUser,
  });

  const isDisabled = !isValid || Object.keys(touched).length === 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await postLogin(values);
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      const userName = response.data.name;
      localStorage.setItem(LocalStorageKey.accessToken, accessToken);
      localStorage.setItem(LocalStorageKey.refreshToken, refreshToken);
      localStorage.setItem(LocalStorageKey.name, userName);

      navigate("/MyPage"); // 로그인 성공 시 MyPage로 이동

    } catch (error) {
      console.error("로그인 오류", error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_SERVER_URL + "/v1/auth/google/login";
  
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-950 text-white">
      <div className="w-full max-w-sm bg-gray-900 p-8 rounded-lg shadow-lg relative">

      {/* 제목 + 뒤로가기 버튼 레이아웃 */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white text-xl font-bold"
            aria-label="뒤로가기"
          >
            &lt;
          </button>
          <h2 className="text-2xl font-bold text-center flex-1">로그인</h2>
          {/* 오른쪽 빈 공간 (가운데 정렬 맞추기용) */}
          <div className="w-[1.5rem]" />
        </div>
        
        <form className="space-y-4 " onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="이메일"
          className={`w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500
          ${errors.email && touched.email ? 'focus:ring-red-500' : ''}`}
          {...getInputProps("email")}
        />
          {touched.email && errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}

          <input
            type="password"
            placeholder="비밀번호"
            className={`w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500
              ${errors.password && touched.password ? 'focus:ring-red-500' : ''}`}
            {...getInputProps("password")}
          />
          {touched.password && errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password}</p>
          )}

          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full font-semibold py-2 rounded transition-colors ${
              isValid
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            로그인
          </button>
          <button type="button" onClick={handleGoogleLogin}className="w-full flex items-center justify-center gap-2 font-semibold py-2 rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors">
            구글로 로그인
          </button>
        </form>
      </div>
    </div>
  );
}

