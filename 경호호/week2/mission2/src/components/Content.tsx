import React from 'react';
import { useTheme, Theme } from '../contexts/ThemeContext';

const Content: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === Theme.DARK;

  return (
    <div 
      style={{
        backgroundColor: isDark ? '#121212' : '#f5f5f5',
        transition: 'all 0.3s ease',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10
      }}
    >
      <button
        onClick={toggleTheme}
        style={{
          backgroundColor: isDark ? '#8c5cf5' : '#ff9500',
          color: isDark ? 'white' : 'black',
          transition: 'all 0.3s ease',
          padding: '25px 50px',
          fontSize: '28px',
          borderRadius: '20px',
          fontWeight: 'bold',
          boxShadow: isDark 
            ? '0 0 20px rgba(140, 92, 245, 0.5)' 
            : '0 0 20px rgba(255, 149, 0, 0.5)',
          border: isDark 
            ? '2px solid #b794f6' 
            : '2px solid #ffb74d',
          cursor: 'pointer',
          zIndex: 20
        }}
      >
        {isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      </button>
    </div>
  );
};

export default Content; 