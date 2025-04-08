import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import Login from './pages/LoginPage'
import HomeLayout from './layout/HomeLayout'
import SingupPage from './pages/SingupPage'

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
  }
]);

function App() {
 return <RouterProvider router={router}/>
}

export default App;
