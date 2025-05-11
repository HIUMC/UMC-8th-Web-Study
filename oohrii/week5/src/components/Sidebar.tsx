import React from 'react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  menuOpen: boolean;
  onMenuToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, menuOpen }) => {
  // 900px 이하에서만 오버레이와 함께 표시
  const isMobile = window.innerWidth <= 900;

  if (isMobile && !open) return null;

  return (
    <>
      {isMobile && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.3)',
            zIndex: 1000,
          }}
        />
      )}
      <aside
        style={{
          width: '180px',
          background: '#111',
          color: '#fff',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: '24px 0',
          position: isMobile ? 'fixed' : 'static',
          top: 0,
          left: 0,
          zIndex: 1100,
          transition: 'transform 0.3s',
          transform: isMobile && !open ? 'translateX(-100%)' : 'translateX(0)',
        }}
      >
        {menuOpen && (
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingLeft: '24px' }}>
            <div style={{ cursor: 'pointer', color: '#b8e0ff' }}>🔍 찾기</div>
            <div style={{ cursor: 'pointer', color: '#b8b8ff' }}>👤 마이페이지</div>
          </nav>
        )}
        <div style={{ paddingLeft: '24px', marginBottom: '24px', color: '#aaa', cursor: 'pointer' }}>탈퇴하기</div>
      </aside>
    </>
  );
};

export default Sidebar; 