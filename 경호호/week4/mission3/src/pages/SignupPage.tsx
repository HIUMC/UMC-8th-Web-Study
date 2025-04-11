import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';


const validateEmail = (email: string): string | null => {
  if (!email) return '이메일을 입력해주세요.';
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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

type SignupStep = 'email' | 'password';

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<SignupStep>('email');
  const {
    values,
    errors,
    isSubmitting,
    isValid, // 전체 폼 유효성
    isFieldValid, // 특정 필드 유효성
    handleChange,
    handleSubmit,
  } = useForm(
    {
      email: '',
      password: '',
    },
    {
      email: validateEmail,
      password: validatePassword,
    }
  );

  const handleGoBack = () => {
    if (step === 'password') {
      setStep('email'); // 비밀번호 단계에서 뒤로가기 시 이메일 단계로
    } else {
      navigate(-1); // 이메일 단계에서 뒤로가기 시 이전 페이지로
    }
  };

  const handleNextStep = () => {
    // 이메일 유효성 검사 후 다음 단계로
    if (isFieldValid('email')) {
      setStep('password');
    }
    // isFieldValid가 false면 버튼이 비활성화되므로 별도 처리는 불필요
  };

  // 최종 회원가입 제출 처리
  const handleSignupSubmit = async (formValues: typeof values) => {
    console.log('회원가입 시도:', formValues);
    // 여기에 실제 회원가입 API 호출 로직 추가
    await new Promise(resolve => setTimeout(resolve, 1000)); // 임시 지연
    alert(`회원가입 성공: ${formValues.email}`);
    navigate('/'); // 성공 시 홈으로 이동 (임시)
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
        <h1 className="text-2xl font-bold text-center flex-grow text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">회원가입</h1>
      </div>

      {step === 'email' && (
        <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
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
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            {errors.email && <p id="email-error" className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
            disabled={!isFieldValid('email')}
          >
            다음
          </button>
        </form>
      )}

      {step === 'password' && (
        <form onSubmit={handleSubmit(handleSignupSubmit)}>
           <div className="mb-4">
              <p className="text-sm text-gray-400">이메일: {values.email}</p>
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
              placeholder="비밀번호 (8자 이상)"
              value={values.password}
              onChange={handleChange}
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
            />
            {errors.password && <p id="password-error" className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? '가입 처리 중...' : '회원가입'}
          </button>
        </form>
      )}
    </div>
  );
};

export default SignupPage;
