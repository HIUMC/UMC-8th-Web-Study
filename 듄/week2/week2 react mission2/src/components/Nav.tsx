import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const Nav: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav>
      <div className="nav-content">
        <h1>My App</h1>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
