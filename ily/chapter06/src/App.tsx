import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage.tsx";
import HomeLayout from "./layouts/HomeLayout.tsx";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage.tsx";
import NotFoundPage from "./pages/NotFoundPage";
import MyPage from "./pages/MyPage.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { RouteObject } from "react-router-dom";
import ProtectedLayout from "./layouts/ProtectedLayout.tsx";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LPidCard from "./pages/LPidCard.tsx";
// 1. 홈페이지
// 2. 로그인 페이지
// 3. 회원가입 페이지
/*
const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />, // 앱 전체에 공통 적용될 레이아웃
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "v1/auth/google/callback",
        element: <GoogleLoginRedirectPage />,
      },
      {
        path: "my",
        element: (
          <ProtectedLayout>
            <MyPage />
          </ProtectedLayout>
        ),
      },
    ],
  },
];
*/

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "v1/auth/google/callback",
        element: <GoogleLoginRedirectPage />,
      },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "my",
        element: <MyPage />,
      },
      {
        path: "lps/:LPid",
        element: <LPidCard />,
      },
    ],
  },
];

export const queryClient = new QueryClient();

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
export default App;
