import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { handleGoogleCallback } from '../api/auth';
import styled from 'styled-components';

const GoogleCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      if (!code) {
        console.error('인증 코드가 없습니다.');
        navigate('/login');
        return;
      }

      try {
        const { accessToken, refreshToken } = await handleGoogleCallback(code);
        login(accessToken, refreshToken);
        navigate('/my');
      } catch (error) {
        console.error('Google 로그인 처리 중 오류 발생:', error);
        navigate('/login');
      }
    };

    handleCallback();
  }, [searchParams, navigate, login]);

  return (
    <Container>
      <LoadingText>Google 로그인 처리 중...</LoadingText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingText = styled.p`
  font-size: 18px;
  color: #666;
`;

export default GoogleCallbackPage; 