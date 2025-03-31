import React from 'react';
import { ThemeProvider, useTheme, Theme } from './contexts/ThemeContext';
import Content from './components/Content';

// 테마를 적용할 컨테이너 컴포넌트
const ThemedContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  const isDark = theme === Theme.DARK;
  
  return (
    <div 
      style={{ 
        transition: 'all 0.3s ease',
        backgroundColor: isDark ? '#121212' : '#f5f5f5',
        color: isDark ? '#ffffff' : '#333333',
        width: '100%',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}
    >
      {children}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ThemedContainer>
        <Content />
      </ThemedContainer>
    </ThemeProvider>
  );
}

export default App;
