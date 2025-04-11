import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviePage";
import NotFound from "./pages/NotFound";
import RootLayout from "./layout/root-layout";

function App() {
  // createBrowerRouter = path(경로) element(어떤 걸 보여줄지) 를 정의
  const router = createBrowserRouter([
    {
      path: "/",
      //      element: <HomePage />,
      element: <RootLayout />,
      // errorElement = 지정하지 않은 경로에 접근에 대한 Element 만들기 . path: "/" 인 곳에 추가해야함 .
      errorElement: <NotFound />,
      children: [
        {
          // 2. index: true는 위의 path: '/' 즉, 홈 경로를 의미한다.
          index: true,
          element: <MoviesPage />,
        },
      ],
    },
    {
      path: "/movies",
      element: <MoviesPage />,
    },
  ]);

  // createBrowserRouter를 통해 만든 router 를. RouterProvider의 router에 전달한다.
  return <RouterProvider router={router} />;
}

export default App;
