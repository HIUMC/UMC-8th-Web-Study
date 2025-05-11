import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styled from 'styled-components';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Zod 스키마 정의
const signupSchema = z.object({
  email: z.string()
    .email('올바른 이메일 형식을 입력해주세요.')
    .min(1, '이메일을 입력해주세요.'),
  password: z.string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.'),
  passwordConfirm: z.string()
    .min(1, '비밀번호를 다시 입력해주세요.'),
  nickname: z.string()
    .min(2, '닉네임은 2자 이상이어야 합니다.')
}).refine((data: { password: string; passwordConfirm: string }) => data.password === data.passwordConfirm, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordConfirm"],
});

// TypeScript 타입 추출
type SignupFormInputs = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useLocalStorage<number>('signup_step', 1);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    getValues,
    trigger,
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      nickname: ''
    }
  });

  const email = watch('email');
  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');
  const nickname = watch('nickname');

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (step === 1) {
        const isEmailValid = await trigger('email');
        if (isEmailValid) {
          setStep(2);
        }
      } else if (step === 2) {
        const isPasswordValid = await trigger(['password', 'passwordConfirm']);
        if (isPasswordValid) {
          setStep(3);
        }
      } else if (step === 3) {
        const isNicknameValid = await trigger('nickname');
        if (isNicknameValid) {
          // 회원가입 완료 로직 구현
          const data = getValues();
          console.log('회원가입 완료:', data);
          localStorage.removeItem('signup_step');
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Form validation error:', error);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <InputWrapper>
              <InputField
                {...register('email')}
                type="email"
                placeholder="이메일을 입력해주세요!"
                error={!!errors.email}
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </InputWrapper>
            <SignupButton 
              type="submit" 
              disabled={!!errors.email || !email}
            >
              다음
            </SignupButton>
          </>
        );
      case 2:
        return (
          <>
            <EmailDisplay>
              <EmailIcon>✉</EmailIcon>
              {getValues('email')}
            </EmailDisplay>
            <InputWrapper>
              <InputContainer>
                <InputField
                  {...register('password')}
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요!"
                  error={!!errors.password}
                />
                <ToggleButton
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁" : "👁‍🗨"}
                </ToggleButton>
              </InputContainer>
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </InputWrapper>
            <InputWrapper>
              <InputContainer>
                <InputField
                  {...register('passwordConfirm')}
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="비밀번호를 다시 한 번 입력해주세요!"
                  error={!!errors.passwordConfirm}
                />
                <ToggleButton
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                >
                  {showPasswordConfirm ? "👁" : "👁‍🗨"}
                </ToggleButton>
              </InputContainer>
              {errors.passwordConfirm && (
                <ErrorMessage>{errors.passwordConfirm.message}</ErrorMessage>
              )}
            </InputWrapper>
            <SignupButton 
              type="submit" 
              disabled={!!errors.password || !!errors.passwordConfirm || !password || !passwordConfirm}
            >
              다음
            </SignupButton>
          </>
        );
      case 3:
        return (
          <>
            <ProfileSection>
              <ProfileImageContainer>
                <ProfileImagePlaceholder>
                  <ProfileIcon>👤</ProfileIcon>
                </ProfileImagePlaceholder>
                <ProfileImageButton type="button">
                  프로필 이미지 등록
                </ProfileImageButton>
              </ProfileImageContainer>
            </ProfileSection>
            <InputWrapper>
              <InputField
                {...register('nickname')}
                type="text"
                placeholder="닉네임을 입력해주세요!"
                error={!!errors.nickname}
              />
              {errors.nickname && (
                <ErrorMessage>{errors.nickname.message}</ErrorMessage>
              )}
            </InputWrapper>
            <SignupButton 
              type="submit" 
              disabled={!!errors.nickname || !nickname}
            >
              회원가입 완료
            </SignupButton>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <SignupContainer>
      <Header>
        <BackButton onClick={() => {
          if (step === 1) navigate(-1);
          else setStep(step - 1);
        }}>&lt;</BackButton>
        <Title>회원가입</Title>
      </Header>
      <SignupForm onSubmit={handleNextStep}>
        {step === 1 && (
          <>
            <GoogleSignupButton type="button">
              <GoogleIcon>G</GoogleIcon>
              구글로 회원가입
            </GoogleSignupButton>
            <Divider>
              <DividerText>OR</DividerText>
            </Divider>
          </>
        )}
        {renderStepContent()}
      </SignupForm>
    </SignupContainer>
  );
};

const SignupContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
`;

const Title = styled.h1`
  margin: 0;
  flex-grow: 1;
  text-align: center;
  font-size: 24px;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const GoogleSignupButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  width: 100%;
`;

const GoogleIcon = styled.span`
  font-weight: bold;
`;

const Divider = styled.div`
  position: relative;
  text-align: center;
  margin: 20px 0;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #ccc;
  }
`;

const DividerText = styled.span`
  background: white;
  padding: 0 10px;
  color: #666;
  position: relative;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 20px;
  color: #666;
  
  &:focus {
    outline: none;
  }
`;

const InputField = styled.input<{ error?: boolean }>`
  padding: 12px;
  padding-right: 40px;
  border: 1px solid ${props => props.error ? 'red' : '#ccc'};
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: ${props => props.error ? 'red' : '#00C2B3'};
  }
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 12px;
  margin: 0;
  padding-left: 4px;
`;

const SignupButton = styled.button<{ disabled: boolean }>`
  padding: 12px;
  background: ${props => props.disabled ? '#cccccc' : '#00C2B3'};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  width: 100%;
  
  &:hover {
    background: ${props => props.disabled ? '#cccccc' : '#00A99E'};
  }
`;

const EmailDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 8px;
  color: #333;
  font-size: 14px;
  margin-bottom: 20px;
`;

const EmailIcon = styled.span`
  color: #666;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const ProfileImagePlaceholder = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const ProfileIcon = styled.span`
  font-size: 40px;
  color: #666;
`;

const ProfileImageButton = styled.button`
  background: none;
  border: none;
  color: #00C2B3;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default SignupPage; 