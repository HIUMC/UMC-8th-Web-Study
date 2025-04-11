import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

import { useLocalStorage } from '../hooks/useLocalStorage';
import axiosInstance from '../lib/axiosInstance';
import ProfileSetup from '../components/ProfileSetup'; // ProfileSetup 컴포넌트 import
import {
  signupSchema,
  SignupFormData,
  nameSchema,
} from '../schemas/authSchemas';

type SignupStep = 'email' | 'password' | 'name' | 'profile'; // 'profile' 단계 추가

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useLocalStorage<SignupStep>('signupStep', 'email');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isValid, isSubmitting, dirtyFields },
    getValues,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
  });

  const handleGoBack = () => {
    setApiError(null);
    if (step === 'profile') { // 프로필 단계에서 뒤로가기
      setStep('name');
    } else if (step === 'name') {
      setStep('password');
    } else if (step === 'password') {
      setStep('email');
    } else {
      navigate(-1);
    }
  };

  const handleNextStep = async () => {
    setApiError(null);
    let isValidStep = false;
    if (step === 'email') {
      isValidStep = await trigger('email');
      if (isValidStep) setStep('password');
    } else if (step === 'password') {
      isValidStep = await trigger(['password', 'confirmPassword']);
      if (isValidStep) setStep('name');
    }
  };

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    setApiError(null);
    try {
      const response = await axiosInstance.post('/v1/auth/signup', {
        email: data.email,
        password: data.password,
        name: data.name,
      });

      console.log('회원가입 성공:', response.data);
      // alert('회원가입에 성공했습니다!'); // 알림 대신 프로필 설정 단계로 이동
      // localStorage.removeItem('signupStep'); // 프로필 설정 완료 후 제거
      // navigate('/signin'); // 프로필 설정 완료 후 이동
      setStep('profile'); // 프로필 설정 단계로 이동

    } catch (error) {
      console.error('회원가입 실패:', error);
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = (error.response.data as { message?: string })?.message;
        setApiError(errorMessage || '회원가입 중 오류가 발생했습니다.');
      } else {
        setApiError('회원가입 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.');
      }
    }
  };

  const isEmailStepValid = !errors.email && dirtyFields.email;
  const isPasswordStepValid = !errors.password && !errors.confirmPassword && dirtyFields.password && dirtyFields.confirmPassword && (watch('password') === watch('confirmPassword'));
  const isNameStepValid = !errors.name && dirtyFields.name;

  const renderError = (fieldError: typeof errors[keyof typeof errors]) => {
    return fieldError && <p className="text-red-400 text-xs mt-1">{fieldError.message}</p>;
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
        <span className="text-sm text-gray-400 ml-4">
          {step === 'email' ? '1/4' : step === 'password' ? '2/4' : step === 'name' ? '3/4' : '4/4'} {/* 단계 표시 수정 */}
        </span>
      </div>

      {apiError && (
        <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">오류!</strong>
          <span className="block sm:inline"> {apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 'email' && (
          <>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                이메일
              </label>
              <input
                type="email"
                id="email"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 bg-gray-700 text-white placeholder-gray-400 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-purple-500 focus:border-purple-500'}`}
                placeholder="이메일을 입력하세요"
                {...register('email')}
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
              />
              {renderError(errors.email)}
            </div>
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
              disabled={!isEmailStepValid}
            >
              다음
            </button>
          </>
        )}

        {step === 'password' && (
          <>
            <div className="mb-4">
              <p className="text-sm text-gray-400">이메일: {getValues('email')}</p>
            </div>
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                비밀번호
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 bg-gray-700 text-white placeholder-gray-400 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-purple-500 focus:border-purple-500'}`}
                placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8자 이상)"
                {...register('password')}
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-sm leading-5 text-gray-400 hover:text-white"
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {renderError(errors.password)}
            </div>
            <div className="mb-6 relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                비밀번호 확인
              </label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 bg-gray-700 text-white placeholder-gray-400 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-purple-500 focus:border-purple-500'}`}
                placeholder="비밀번호를 다시 입력하세요"
                {...register('confirmPassword')}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby="confirmPassword-error"
              />
               <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-sm leading-5 text-gray-400 hover:text-white"
                aria-label={showConfirmPassword ? "비밀번호 확인 숨기기" : "비밀번호 확인 보기"}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {renderError(errors.confirmPassword)}
            </div>
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
              disabled={!isPasswordStepValid}
            >
              다음
            </button>
          </>
        )}

        {step === 'name' && (
          <>
            <div className="mb-4">
              <p className="text-sm text-gray-400">이메일: {getValues('email')}</p>
            </div>
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                이름
              </label>
              <input
                type="text"
                id="name"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 bg-gray-700 text-white placeholder-gray-400 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-purple-500 focus:border-purple-500'}`}
                placeholder="이름 (2~10자)"
                {...register('name')}
                aria-invalid={!!errors.name}
                aria-describedby="name-error"
              />
              {renderError(errors.name)}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
              disabled={!isNameStepValid || isSubmitting}
            >
              {isSubmitting ? '가입 처리 중...' : '회원가입'}
            </button>
          </>
        )}

        {step === 'profile' && ( // 프로필 설정 단계 UI 렌더링
          <ProfileSetup />
        )}
      </form>
    </div>
  );
};

export default SignupPage;
