import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage'; // HomePage 임포트

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <main className="flex-grow flex items-center justify-center p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </div>
  );
}

// 임시 LoginPage 컴포넌트 (나중에 pages 폴더로 이동 및 구현)
// const LoginPage = () => <div>로그인 페이지 내용</div>;

export default App;
