import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import TopRatedPage from "./pages/Top-ratedPage";
import UpComingPage from "./pages/UpComingPage";
import NowPlayingPage from "./pages/Now-playingPage";
import MoviePage from './pages/MoviePage';
import MovieDetailPage from './pages/MovieDetailPage';
import RootLayout from './layout/root-layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/movies/popular",
        element: <MoviePage />,
      },
      {
        path: "/movies/top_rated",
        element: <TopRatedPage />,
      },
      {
        path: "/movies/upcoming",
        element: <UpComingPage />,
      },
      {
        path: "/movies/now_playing",
        element: <NowPlayingPage />,
      },
      {
        path: "/movie/:movieId",
        element: <MovieDetailPage />,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;