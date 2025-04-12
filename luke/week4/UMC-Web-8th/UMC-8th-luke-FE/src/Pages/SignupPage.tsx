import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSignup } from '../apis/auth';

const schema = z
  .object({
    name: z.string().min(1, '이름을 입력하세요.'),
    email: z.string().email('유효한 이메일 형식이 아닙니다.'),
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .max(20, '비밀번호는 20자 이하이어야 합니다.'),
    passwordCheck: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .max(20, '비밀번호는 20자 이하이어야 합니다.'),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordCheck'],
  });

type FormField = z.infer<typeof schema>;

export default function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    trigger,
  } = useForm<FormField>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormField) => {
    const { passwordCheckkkk, ...rest } = data;
    try {
      const response = await postSignup(rest);
      console.log('회원가입 완료', response);
      navigate('/login');
    } catch (err) {
      console.error('회원가입 실패', err);
    }
  };

  const handleEmailNext = async () => {
    const valid = await trigger('email');
    if (valid) setStep(2);
  };

  const isNameValid = getValues('name')?.trim().length > 0;

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-950 text-white">
      <div className="w-full max-w-sm bg-gray-900 p-8 rounded-lg shadow-lg relative">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white text-xl font-bold"
            aria-label="뒤로가기"
          >
            &lt;
          </button>
          <h2 className="text-2xl font-bold text-center flex-1">회원가입</h2>
          <div className="w-[1.5rem]" />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: 이메일 */}
          {step === 1 && (
            <>
              <input
                {...register('email')}
                type="email"
                placeholder="이메일"
                className={`w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                  errors.email ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}

              <button
                type="button"
                onClick={handleEmailNext}
                className={`w-full font-semibold py-2 rounded transition-colors ${
                  getValues('email') && !errors.email
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                다음
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-sm text-gray-400">
                이메일: {getValues('email')}
              </p>

              <input
                {...register('password')}
                type="password"
                placeholder="비밀번호"
                className={`w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-500 
        focus:outline-none focus:ring-2 ${
          errors.password ? 'focus:ring-red-500' : 'focus:ring-blue-500'
        }`}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}

              <input
                {...register('passwordCheck')}
                type="password"
                placeholder="비밀번호 확인"
                onBlur={async (e) => {
                  // 기존 onBlur 실행 후, 두 필드 전체에 대해 강제로 검증 수행
                  await trigger(['password', 'passwordCheck']);
                }}
                className={`w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-500 
        focus:outline-none focus:ring-2 ${
          errors.passwordCheck ? 'focus:ring-red-500' : 'focus:ring-blue-500'
        }`}
              />
              {errors.passwordCheck && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.passwordCheck.message}
                </p>
              )}
              {/* 아 진짜 씨*/}
              <button
                type="button"
                // disabled={!!errors.password && !!errors.passwordCheck}
                onClick={() => setStep(3)}
                className={`w-full font-semibold py-2 rounded transition-colors ${
                  !errors.password && !errors.passwordCheck
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                다음
              </button>
            </>
          )}
          {/* Step 3: 이름 입력 */}
          {step === 3 && (
            <>
              <p className="text-sm text-gray-400">
                이메일: {getValues('email')}
              </p>

              <input
                {...register('name')}
                placeholder="이름"
                className={`w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                  errors.name ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                }`}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}

              <button
                type="submit"
                disabled={!isNameValid}
                className={`w-full font-semibold py-2 rounded transition-colors ${
                  isNameValid
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                회원가입 완료
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
