import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CartPage from './pages/CartPage'
import NotFound from './pages/NotFound'
import Layout from './LayOut/Layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <CartPage /> },
      // 추가 페이지
    ],
  },
])

export default function App() {
  return (
      
      <RouterProvider router={router} />
  )
}
