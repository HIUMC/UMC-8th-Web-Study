import React from 'react';
import { useTheme, Theme } from '../contexts/ThemeContext';

const NavBar: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === Theme.DARK;

  return (
    <nav 
      style={{
        backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
        borderBottom: `1px solid ${isDark ? '#333333' : '#e5e7eb'}`,
        height: '64px',
        width: '100%',
        transition: 'all 0.3s ease'
      }}
    >
    </nav>
  );
};

export default NavBar; 