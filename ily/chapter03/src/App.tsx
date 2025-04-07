import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import NotFound from "./pages/not-found";
import MoviesPage from "./pages/MoviesPage";
import RootLayout from "./layout/root-layout";

const router = createBrowserRouter([
  {
    path: "/",
    //element: <HomePage />,
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "movies",
        element: <MoviesPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
