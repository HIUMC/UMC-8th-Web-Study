import './App.css';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import MoviePage from './pages/MoviePage';
import NotFoundPage from './pages/NotFoundPage';
// import MoviePage from './pages/MoviePage';

// createBrowserRouter v6 기준으로 진행.
// BrowerRouter v5, react-router-dom v7 (next.js, remix) 등에 대해서도 찾아보기
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'movies/:category', // ':' = dynamic parameter
        element: <MoviePage />,
      },
      {
        path: 'movie/:movieId',
        element: <MovieDetailPage />,
      }
    ],
  },
]);

// 아래와 같이 페이지를 만든다.

// movies?category=upcoming
// movies?category=popular
// movies?category=now_playing
// movies?category=top_rated

// 위 4개를 동적으로 받아서 카테고리 구성 후,
// movies/category/{movie_id}

function App() {
  return <RouterProvider router={router} />;
}

export default App;