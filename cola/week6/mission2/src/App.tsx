import Home from './pages/Home';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import MyInfoPage from './pages/MyInfoPage';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layout/ProtectedLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SidebarProvider } from './context/SidebarContext';
import LpDetailsPage from './pages/LpDetailsPage';

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <LogInPage /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: 'v1/auth/google/callback', element: <GoogleLoginRedirectPage /> },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      { path: 'myinfo', element: <MyInfoPage /> },
      { path: 'lp/:lpId', element: <LpDetailsPage /> },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SidebarProvider>
          <RouterProvider router={router} />
        </SidebarProvider>
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
