import './App.css'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import HomeLayout from './layouts/HomeLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import { AuthProvider } from './context/AuthContext';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LpDetailPage from './pages/LpDetailPage';

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <HomePage />},
      {path: "login", element: <LoginPage />},
      {path: "signup", element: <SignupPage />},
      {path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage />},
      {path: "lps/:lpId", element: <LpDetailPage />},
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {path: "my", element: <MyPage />},
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

export const queryClient = new QueryClient();

function App() {
  return(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      {/* 개발 환경에서만 조회할 수 있음 */}
    </QueryClientProvider>
  )
}

export default App
