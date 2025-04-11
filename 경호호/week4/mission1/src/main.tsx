import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'

import Layout from './components/Layout'
import MovieListPage from './pages/MovieListPage'
import MovieDetailPage from './pages/MovieDetailPage' // <-- MovieDetailPage 임포트 추가

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/movies/popular" replace />
      },
      {
        path: 'movies/:category',
        element: <MovieListPage />,
      },
      { // <-- 영화 상세 페이지 라우트 추가
        path: 'movie/:id', 
        element: <MovieDetailPage />,
      }
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
