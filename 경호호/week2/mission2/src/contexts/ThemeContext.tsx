import React, { createContext, useContext, useState, ReactNode } from 'react';

// 테마 타입 정의
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

// 테마 컨텍스트 타입 정의
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// 테마 컨텍스트 생성
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 테마 Provider 컴포넌트
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  // 테마 토글 함수
  const toggleTheme = () => {
    setTheme((prevTheme) => 
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };

  // Context에 제공할 값
  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook - 테마 컨텍스트 사용을 쉽게 해줌
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}; 