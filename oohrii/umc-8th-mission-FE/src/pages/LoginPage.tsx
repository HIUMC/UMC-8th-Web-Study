import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  useEffect(() => {
    setIsValid(validateEmail(email) && validatePassword(password));
  }, [email, password]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setEmailError('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    // 로그인 로직 구현
  };

  return (
    <LoginContainer>
      <Header>
        <BackButton onClick={() => navigate(-1)}>&lt;</BackButton>
        <Title>로그인</Title>
      </Header>
      <LoginForm>
        <GoogleLoginButton>
          <GoogleIcon>G</GoogleIcon>
          구글 로그인
        </GoogleLoginButton>
        <Divider>
          <DividerText>OR</DividerText>
        </Divider>
        <InputWrapper>
          <InputField
            type="email"
            placeholder="이메일을 입력해주세요!"
            value={email}
            onChange={handleEmailChange}
            error={!!emailError}
          />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        </InputWrapper>
        <InputWrapper>
          <InputField
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            value={password}
            onChange={handlePasswordChange}
            error={!!passwordError}
          />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        </InputWrapper>
        <LoginButton onClick={handleLogin} disabled={!isValid}>
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

const LoginForm = styled.div`
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
    border-color: ${props => props.error ? 'red' : '#ff1b6d'};
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

export default LoginPage;