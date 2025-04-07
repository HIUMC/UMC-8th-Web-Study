import "./App.css";
import { ReactElement } from "react";
import MoviePage from "./pages/MoviePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetailPage from "./pages/MovieDetailPage";

// BrowserRouter v5
// createBrowserRouter v6
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,

    errorElement: <NotFoundPage />,
    children: [
      {
        path: "movies/:category",
        element: <MoviePage />,
      },
      {
        path: "movie/:movieId",
        element: <MovieDetailPage />,
      },
    ],
  },
]);

function App(): ReactElement {
  return <RouterProvider router={router} />;
}

export default App;
