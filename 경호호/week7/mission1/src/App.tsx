import { Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';
import OAuthRedirectHandler from './pages/OAuthRedirectHandler';
import UsersMePage from './pages/UsersMePage';
import UserDetailPage from './pages/UserDetailPage';
import UserEditPage from './pages/UserEditPage';
import LPDetailPage from './pages/LPDetailPage';
import LPEditPage from './pages/LPEditPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/v1/auth/google/callback" element={<OAuthRedirectHandler />} />
          <Route path="/oauth2/redirect" element={<OAuthRedirectHandler />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/users/me" element={<UsersMePage />} />
            <Route path="/users/:userId" element={<UserDetailPage />} />
            <Route path="/users/edit" element={<UserEditPage />} />
            <Route path="/lp/:lpId" element={<LPDetailPage />} />
            <Route path="/lp/:lpId/edit" element={<LPEditPage />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
