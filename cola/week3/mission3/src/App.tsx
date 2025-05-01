import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import MoviesPage from "./pages/MoviesPage";
import RootLayout from "./layout/root-layout";
import { MoviePage } from "./pages/MoviePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    // 1. Navbar 밑에 path에 해당하는 element를 보여주고 싶으면 아래와 같이 children을 활용
    children: [
      {
        // 2. index: true는 위의 path: '/' 즉, 홈 경로를 의미한다.
        index: true,
        element: <HomePage />,
      },
      {
        path: "movies/:category",
        element: <MoviesPage />,
      },
    ],
  },
  {
    path: "movie/:movieId",
    element: <MoviePage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
