import { z } from 'zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/mutations/useLogin';

const schema = z.object({
  email: z.string().email({ message: '이메일 형식이 올바르지 않습니다.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
    .max(20, {
      message: '비밀번호는 20자 이하여야 합니다.',
    }),
});

type FormFields = z.infer<typeof schema>;

const LogInPage = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const { mutate: login } = useLogin();

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [navigate, accessToken]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormFields) => {
    await login(data);
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + '/v1/auth/google/login';
  };

  return (
    <div className="flex flex-col bg-gray-900 h-full items-center gap-20 pt-20">
      <h1 className="text-3xl text-white">로그인 페이지</h1>
      <div className="flex flex-col gap-3 items-center">
        <input
          {...register('email')}
          placeholder="이메일을 입력하세요."
          className="w-60 h-8 rounded-md bg-gray-400 text-gray-600 text-sm p-2"
        />
        {errors.email && (
          <div className="text-sm text-red-500">{errors.email.message}</div>
        )}
        <input
          {...register('password')}
          type="password"
          placeholder="비밀번호를 입력하세요."
          className="w-60 h-8 rounded-md bg-gray-400 text-gray-600 text-sm p-2"
        />
        {errors.password && (
          <div className="text-sm text-red-500">{errors.password.message}</div>
        )}
        <button
          onClick={handleSubmit(onSubmit)}
          className="bg-gray-700 w-60 h-10 rounded-md text-white cursor-pointer"
        >
          로그인
        </button>
        <button
          onClick={handleGoogleLogin}
          className="bg-gray-700 w-60 h-10 rounded-md text-white cursor-pointer"
        >
          <div className="flex justify-center gap-1">
            <img src={'/images/Google__G__logo.svg'} alt="Google Logo Image" />
            <span>구글 로그인</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LogInPage;
