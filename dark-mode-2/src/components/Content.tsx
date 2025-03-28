import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const Content: React.FC = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <main>
      <div className="content">
        <h2>Welcome to the {isDarkMode ? 'Dark' : 'Light'} Mode</h2>
      </div>
    </main>
  );
};

export default Content;
