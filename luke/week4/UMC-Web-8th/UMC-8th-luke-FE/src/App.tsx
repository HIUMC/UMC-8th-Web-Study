import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './LayOut/Layout';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import NotFound from './Pages/NotFound';
import MyPage from './Pages/MyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'signin', element: <SignupPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'mypage', element: <MyPage/>},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;