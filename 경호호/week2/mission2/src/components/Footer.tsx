import React from 'react';
import { useTheme, Theme } from '../contexts/ThemeContext';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === Theme.DARK;

  return (
    <footer 
      style={{
        backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
        borderTop: `1px solid ${isDark ? '#333333' : '#e5e7eb'}`,
        height: '60px',
        width: '100%',
        transition: 'all 0.3s ease'
      }}
    >
    </footer>
  );
};

export default Footer; 