import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const OAuthRedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { socialLogin } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');
    if (accessToken && refreshToken) {
      socialLogin({ accessToken, refreshToken });
      navigate('/', { replace: true });
    } else {
      navigate('/signin', { replace: true });
    }
  }, [location.search, socialLogin, navigate]);

  return <div className="text-center">로그인 처리중...</div>;
};

export default OAuthRedirectHandler; 