import { Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';
import UsersMePage from './pages/UsersMePage';
import UserDetailPage from './pages/UserDetailPage';
import UserDeletePage from './pages/UserDeletePage';
import UserEditPage from './pages/UserEditPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
        <main className="flex-grow flex items-center justify-center p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/users/me" element={<UsersMePage />} />
              <Route path="/users/:userId" element={<UserDetailPage />} />
              <Route path="/users/delete" element={<UserDeletePage />} />
              <Route path="/users/edit" element={<UserEditPage />} />
            </Route>
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
