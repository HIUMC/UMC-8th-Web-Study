import React from 'react';
import ReactDOM from 'react-dom/client';  // 변경된 import
import './index.css';
import App from './App';

// createRoot를 사용하여 렌더링
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
