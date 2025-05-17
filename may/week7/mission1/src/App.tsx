import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layouts/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LpDetailPage from './pages/LpDetailPage';


// 1. 홈페이지
// 2. 로그인 페이지
// 3. 회원가입 페이지

// publicRoutes: 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AuthProvider>
        <HomeLayout />
      </AuthProvider>
    ),
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      {
        path: "/v1/auth/google/callback",
        element: <GoogleLoginRedirectPage />,
      },
      {
        path: "lps/:lpId", element: <LpDetailPage />,
      }
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AuthProvider>
        <ProtectedLayout />
      </AuthProvider>
    ),
    errorElement: <NotFoundPage />,
    children: [{ path: "my", element: <MyPage /> }],
  },
];
const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;