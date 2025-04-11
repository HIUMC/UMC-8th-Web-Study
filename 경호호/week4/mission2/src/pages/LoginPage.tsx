import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 추가
import useForm from '../hooks/useForm';
import axiosInstance from '../lib/axiosInstance'; // axiosInstance 추가
import { useLocalStorage } from '../hooks/useLocalStorage'; // useLocalStorage 추가

const validateEmail = (email: string): string | null => {
  if (!email) return '이메일을 입력해주세요.';
  if (!/\S+@\S+\.\S+/.test(email)) {
    return '올바른 이메일 형식이 아닙니다.';
  }
  return null;
};

const validatePassword = (password: string): string | null => {
  if (!password) return '비밀번호를 입력해주세요.';
  if (password.length < 8) {
    return '비밀번호는 최소 8자 이상이어야 합니다.';
  }
  return null;
};


const LoginPage = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null); // API 에러 상태 추가
  const [, setAccessToken] = useLocalStorage<string | null>('accessToken', null); // Access Token 저장용
  const [, setRefreshToken] = useLocalStorage<string | null>('refreshToken', null); // Refresh Token 저장용

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
    setApiError(null); // 이전 에러 초기화
    try {
      const response = await axiosInstance.post('/v1/auth/signin', {
        email: formValues.email,
        password: formValues.password,
      });

      // 응답 데이터에서 토큰 추출 (API 응답 구조에 따라 키 이름 조정 필요)
      const { accessToken, refreshToken } = response.data;

      if (accessToken && refreshToken) {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        alert('로그인 성공!');
        navigate('/'); // 로그인 성공 시 홈 페이지로 이동 (경로 수정 가능)
      } else {
        // 토큰이 응답에 없는 경우
        setApiError('로그인 응답 형식이 올바르지 않습니다.');
      }

    } catch (error) {
      console.error('로그인 실패:', error);
      if (axios.isAxiosError(error) && error.response) {
        // 백엔드에서 내려주는 에러 메시지 사용 (구조에 따라 키 이름 조정 필요)
        const errorMessage = (error.response.data as { message?: string })?.message;
        setApiError(errorMessage || '로그인 중 오류가 발생했습니다.');
      } else {
        setApiError('로그인 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.');
      }
    }
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

      {/* API 에러 메시지 표시 */}
      {apiError && (
        <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">오류!</strong>
          <span className="block sm:inline"> {apiError}</span>
        </div>
      )}

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
