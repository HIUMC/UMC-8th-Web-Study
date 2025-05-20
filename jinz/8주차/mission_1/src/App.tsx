import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import Login from './pages/LoginPage'
import HomeLayout from './layout/HomeLayout'
import SignupPage from './pages/SignupPage'
import MyPage from './pages/MyPage'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import GoogleCallback from './pages/GoogleCallback'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import LPDetailPage from './pages/LPDetailPage'
import { SearchProvider } from './context/SearchContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout/>, //주로 공유하는 element들을 넣어줌
    errorElement: <NotFoundPage/>,
    children: [
      {path: '/', element: <HomePage/>},
      {path: 'login', element: <Login/>},
      {path: 'signup', element: <SignupPage/>},
      {path: 'v1/auth/google/callback', element: <GoogleCallback/>},
      {
        path: 'v1/lps/:id',
        element: (
          <ProtectedRoute>
            <LPDetailPage/>
          </ProtectedRoute>
        )
      },
      {
        path: 'mypage',
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        )
      }
  ]   
  }
]);

const queryClient = new QueryClient();

function App() {
 return(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <SearchProvider>
          <RouterProvider router={router}/>
        </SearchProvider>
      </QueryClientProvider>
    </AuthProvider>
  </GoogleOAuthProvider>
  
 ) 
}

export default App;
