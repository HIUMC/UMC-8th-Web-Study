import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import HomeLayout from "./layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthContext";
import ProtecetLayout from "./layouts/ProtectedLayout";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LpDetailPage from "./pages/LpDetailPage";
// 1. 홈페이지
// 2. 로그인
// 3. 회원가입

// publicRoutes : 인증 없이 접근한 라우터
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "v1/auth/google/login",
        element: <GoogleLoginRedirectPage />,
      },
      // {
      //   path: "lps/:lpId",
      //   element: <LpDetailPage />,
      // },
    ],
  },
];

// protectedRoutes : 인증 후 접근한 라우터
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtecetLayout />,
    children: [
      {
        path: "my",
        element: <MyPage />,
      },
      {
        path: "lps/:lpId",
        element: <LpDetailPage />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient({
  defaultOptions: {
    // 쿼리에 관한 요청은 3번 재시도
    queries: {
      retry: 3,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {/* Dev환경일 때에만 키겠다. - 배포환경에서는 안킴 */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
