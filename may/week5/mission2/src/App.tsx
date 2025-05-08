
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import HomeLayout from './layouts/HomeLayout'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import MyPage from './pages/MyPage'

const router=createBrowserRouter([
  {
    path:"/",
    element:<HomeLayout/>,
    errorElement:<NotFoundPage/>,
    children:[
      {index:true, element:<HomePage/>},
      {path:'login', element:<LoginPage/>},
      {path:'signup', element:<SignupPage/>},
      {path: 'my', element: <MyPage />}

    ]
  }
])

function App() {
  return <RouterProvider router={router}/>
  
}
export default App


