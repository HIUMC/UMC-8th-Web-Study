import React from 'react';
import { Outlet } from 'react-router-dom';

const HomeLayout: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#232628' }}>
      <Outlet />
    </div>
  );
};

export default HomeLayout; 