import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      background: '#232628',
      color: '#fff',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '120px', margin: '0', color: '#ff4d9d' }}>404</h1>
      <h2 style={{ fontSize: '32px', margin: '20px 0' }}>페이지를 찾을 수 없습니다</h2>
      <p style={{ fontSize: '18px', marginBottom: '30px', color: '#ccc' }}>
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <Link 
        to="/" 
        style={{
          padding: '12px 24px',
          background: '#ff4d9d',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          transition: 'background 0.3s ease'
        }}
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFoundPage; 