import React from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm'; // useForm 훅 임포트

// 이메일 유효성 검사 함수
const validateEmail = (email: string): string | null => {
  if (!email) return '이메일을 입력해주세요.';
  if (!/\S+@\S+\.\S+/.test(email)) {
    return '올바른 이메일 형식이 아닙니다.';
  }
  return null;
};

// 비밀번호 유효성 검사 함수
const validatePassword = (password: string): string | null => {
  if (!password) return '비밀번호를 입력해주세요.';
  if (password.length < 8) {
    return '비밀번호는 최소 8자 이상이어야 합니다.';
  }
  return null;
};


const LoginPage = () => {
  const navigate = useNavigate();
  const {
    values,
    errors,
    isSubmitting,
    isValid,
    handleChange,
    handleSubmit
  } = useForm({
    email: '',
    password: '',
  }, {
    email: validateEmail,
    password: validatePassword,
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLoginSubmit = async (formValues: typeof values) => {
    console.log('로그인 시도:', formValues);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(`로그인 시도: ${formValues.email}`);
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
      <div className="flex items-center mb-6">
        <button
          onClick={handleGoBack}
          className="text-gray-400 hover:text-white mr-4 text-2xl"
          aria-label="뒤로 가기"
        >
          {'<'}
        </button>
        <h1 className="text-2xl font-bold text-center flex-grow text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">로그인</h1>
      </div>

      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 bg-gray-700 text-white placeholder-gray-400 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-purple-500 focus:border-purple-500'}`}
            placeholder="이메일을 입력하세요"
            value={values.email}
            onChange={handleChange}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby="email-error"
          />
          {errors.email && <p id="email-error" className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 bg-gray-700 text-white placeholder-gray-400 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-purple-500 focus:border-purple-500'}`}
            placeholder="비밀번호를 입력하세요"
            value={values.password}
            onChange={handleChange}
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby="password-error"
          />
          {errors.password && <p id="password-error" className="text-red-400 text-xs mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
