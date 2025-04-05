import { JSX } from 'react';
import './App.css';
import MoviePage from './pages/MoviePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from './pages/MovieDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <div className="p-10 text-2xl">홈페이지입니다 🎬</div>,
      },
      {
        path: 'movies',
        children: [
          {
            path: 'category/:category',
            element: <MoviePage />,
          },
          {
            path: 'detail/:movieId',
            element: <MovieDetailPage />,
          },
        ],
      },
    ],
  },
]);

function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
