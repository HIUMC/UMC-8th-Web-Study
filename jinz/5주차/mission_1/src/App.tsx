import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import Login from './pages/LoginPage'
import HomeLayout from './layout/HomeLayout'
import SingupPage from './pages/SingupPage'
import MyPage from './pages/MyPage'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import ProtectedLayout from './layout/ProtectedLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout/>, //주로 공유하는 element들을 넣어줌
    errorElement: <NotFoundPage/>,
    children: [
      {path: '/', element: <HomePage/>},
      {path: 'login', element: <Login/>},
      {path: 'singup', element: <SingupPage/>}
    ]
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
            <ProtectedLayout/>
        </ProtectedRoute>

      ),
      children: [
        {path: 'mypage', element: <MyPage/>}
      ]
    }
      
    
]);

function App() {
 return(
  <AuthProvider>
    <RouterProvider router={router}/>
  </AuthProvider>
 ) 
}

export default App;
