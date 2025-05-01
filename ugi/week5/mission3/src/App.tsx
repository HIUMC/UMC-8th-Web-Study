import { BrowserRouter, Routes, Route } from "react-router-dom"; // BrowserRouter 쓰기
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomeLayout from "./layouts/HomeLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { AuthProvider } from "./context/AuthContext";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* 구글 리다이렉트 라우트는 최상단에 위치해야 함 */}
          <Route path="/v1/auth/google/callback" element={<GoogleLoginRedirectPage />} />

          {/* public routes */}
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>

          {/* protected routes */}
          <Route path="/" element={<ProtectedLayout />}>
            <Route path="my" element={<MyPage />} />
          </Route>

          {/* not found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}


export default App;


