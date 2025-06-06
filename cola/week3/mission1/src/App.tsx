import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";
import NotFound from "./pages/not-found";
import MoviesPage from "./pages/movies";
import RootLayout from "./layout/root-layout";

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
        path: "movies/:pageId",
        element: <MoviesPage />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="px-50">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
