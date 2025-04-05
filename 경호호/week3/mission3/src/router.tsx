import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MovieListPage from './pages/MovieListPage';
import MovieDetailPage from './pages/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Layout><NotFoundPage /></Layout>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'movies/:category',
        element: <MovieListPage />,
      },
      {
        path: 'movie/:id',
        element: <MovieDetailPage />,
      },
    ],
  },
]);

export default router; 