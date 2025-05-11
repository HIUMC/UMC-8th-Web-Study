import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onBurgerClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBurgerClick }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, nickname } = useAuth();
  const isMobile = window.innerWidth <= 900;

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', background: '#1e1e1e', color: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div
          style={{ fontSize: '32px', color: '#fff', cursor: 'pointer', marginRight: '8px', display: 'flex', alignItems: 'center' }}
          onClick={isMobile ? onBurgerClick : undefined}
        >
          <div style={{ width: '32px', height: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px' }}>
            <div style={{ width: '32px', height: '3px', background: '#fff', borderRadius: '2px' }}></div>
            <div style={{ width: '32px', height: '3px', background: '#fff', borderRadius: '2px' }}></div>
            <div style={{ width: '32px', height: '3px', background: '#fff', borderRadius: '2px' }}></div>
          </div>
        </div>
        <div style={{ fontWeight: 'bold', fontSize: '40px', color: '#e649a0', letterSpacing: '-2px' }}>돌려돌려LP판</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <span style={{ fontSize: '32px', color: '#fff' }}>🔍</span>
        {isAuthenticated ? (
          <>
            <span style={{ fontSize: '22px' }}>{nickname ? `${nickname}님 반갑습니다.` : '반갑습니다.'}</span>
            <button onClick={logout} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '22px', cursor: 'pointer' }}>로그아웃</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}>로그인</button>
            <button onClick={() => navigate('/signup')} style={{ background: '#e649a0', border: 'none', color: '#fff', fontSize: '24px', borderRadius: '12px', padding: '8px 24px', cursor: 'pointer', fontWeight: 'bold' }}>회원가입</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header; 