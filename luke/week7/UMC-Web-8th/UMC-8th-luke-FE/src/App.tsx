import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './LayOut/Layout';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import NotFound from './Pages/NotFound';
import MyPage from './Pages/MyPage';
import LpPage from './Pages/LpPage';

import ProtectedRoute from './components/ProtectedRoute'; 
import GoogleLoginRedirect from './Pages/GoogleLoginRedirect';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LpDetailPage from './Pages/LpDetailPage';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'signin', element: <SignupPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'mypage', element: <ProtectedRoute><MyPage/></ProtectedRoute> },

      { path: 'lp', element: <LpPage /> },
      { path: "lp/:lpid", element: <LpDetailPage />},
      
      { path: "/v1/auth/google/callback", element: <GoogleLoginRedirect/> },
    ],
  },
]);

function App() {
  return(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  ) 
}

export default App;