import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../api/axios';
import { getGoogleAuthUrl } from '../api/auth';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      console.log('로그인 시도:', data);
      const response = await axiosInstance.post('/auth/login', data);
      const { accessToken, refreshToken } = response.data;
      
      console.log('로그인 성공:', { accessToken, refreshToken });
      
      // 로그인 함수 호출
      login(accessToken, refreshToken);
      
      // 상태 업데이트가 완료될 때까지 기다린 후 리다이렉트
      await new Promise(resolve => setTimeout(resolve, 100));
      console.log('마이페이지로 리다이렉트');
      navigate('/my', { replace: true });
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
    }
  };

  const handleGoogleLogin = () => {
    const authUrl = getGoogleAuthUrl();
    window.location.href = authUrl;
  };

  return (
    <LoginContainer>
      <Header>
        <BackButton onClick={() => navigate(-1)}>&lt;</BackButton>
        <Title>로그인</Title>
      </Header>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <GoogleLoginButton type="button" onClick={handleGoogleLogin}>
          <GoogleIcon>G</GoogleIcon>
          구글 로그인
        </GoogleLoginButton>
        <Divider>
          <DividerText>OR</DividerText>
        </Divider>
        <InputWrapper>
          <InputField
            {...register('email', {
              required: true,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '올바른 이메일 형식을 입력해주세요.',
              },
            })}
            type="email"
            placeholder="이메일을 입력해주세요!"
            error={!!errors.email}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </InputWrapper>
        <InputWrapper>
          <InputField
            {...register('password', {
              required: true,
              minLength: {
                value: 8,
                message: '비밀번호는 8자 이상이어야 합니다.',
              },
            })}
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            error={!!errors.password}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </InputWrapper>
        <LoginButton type="submit" disabled={!isValid}>
          로그인
        </LoginButton>
      </LoginForm>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
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

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const GoogleLoginButton = styled.button`
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

const InputField = styled.input<{ error?: boolean }>`
  padding: 12px;
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

const LoginButton = styled.button<{ disabled: boolean }>`
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: ${props => props.disabled ? '#ccc' : '#00C2B3'};
  color: white;
  font-weight: bold;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  width: 100%;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.disabled ? '#ccc' : '#00A99C'};
  }
`;

export default LoginPage;