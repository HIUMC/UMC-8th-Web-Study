import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './LayOut/Layout';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import NotFound from './Pages/NotFound';
import MyPage from './Pages/MyPage';
import ProtectedRoute from './components/ProtectedRoute'; 
import GoogleLoginRedirect from './Pages/GoogleLoginRedirect';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'signin', element: <SignupPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'mypage', element:<ProtectedRoute><MyPage/></ProtectedRoute> },
      { path: "/v1/auth/google/callback", element: <GoogleLoginRedirect/> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;