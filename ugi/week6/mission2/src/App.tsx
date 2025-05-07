// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import NotFoundPage from "./pages/NotFoundPage";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";

import HomeLayout from "./layouts/HomeLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { AuthProvider } from "./context/AuthContext";

// React Query 클라이언트 생성
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* 구글 로그인 리다이렉트 */}
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

      {/* React Query Devtools (개발 환경에서만 표시) */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;



