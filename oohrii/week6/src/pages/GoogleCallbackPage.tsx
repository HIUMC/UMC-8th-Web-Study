import React, { useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const GoogleCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // 1. 쿼리스트링에 token이 있으면 바로 로그인 처리
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      login(token, '', 'google'); // accessToken, refreshToken, provider
      navigate('/my', { replace: true });
      return;
    }

    // 2. 기존 방식(code로 처리)도 fallback으로 남겨둠
    const code = searchParams.get('code');
    if (!code) {
      console.error('인증 코드가 없습니다.');
      navigate('/login');
      return;
    }

    // 기존 코드: 필요시 유지
    // handleGoogleCallback(code)
    //   .then(({ accessToken, refreshToken }) => {
    //     login(accessToken, refreshToken, 'google');
    //     navigate('/my', { replace: true });
    //   })
    //   .catch(() => {
    //     navigate('/login');
    //   });
  }, [location, searchParams, login, navigate]);

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