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

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <HomePage />},
      {path: "login", element: <LoginPage />},
      {path: "signup", element: <SignupPage />},
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


function App() {
  return(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  ); 
}

export default App
