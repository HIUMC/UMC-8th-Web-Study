import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/root-layout';
import Home from './pages/home';
import NotFound from './pages/not-found';
import MovieDetailPage from './pages/moviedetail';
import MoviePageTemplate from './pages/MoviePageTemplate';
import SearchPage from './pages/SearchPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      
      { index: true, element: <Home /> },
      { path: 'search', element: <SearchPage /> }, 
      { path: ':categoryType', element: <MoviePageTemplate /> },
      { path: 'movie/:movieId', element: <MovieDetailPage /> },
      
      { path: '*', element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;