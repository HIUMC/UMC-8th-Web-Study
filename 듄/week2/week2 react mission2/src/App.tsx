import React, { useState, createContext, useContext } from 'react';
import './App.css';

// 테마 변경을 위한 Context 설정
const ThemeContext = createContext<any>(null);

const App = () => {
  const [theme, setTheme] = useState('light');

  // 테마를 변경하는 함수
  const toggleTheme = () => {
    setTheme((prevTheme: string) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`App ${theme}`}>
        <Navbar />
        <Content />
      </div>
    </ThemeContext.Provider>
  );
};

// Navbar 컴포넌트
const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav>
      <div className="nav-content">
        <h1>WEEk2 - 다크 모드 구현하기</h1>
      </div>
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
    </nav>
  );
};

// Content 컴포넌트
const Content = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="content">
      <h2>Welcome to <strong>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</strong></h2>
    </div>
  );
};

export default App;
