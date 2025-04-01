import './App.css'

// 라우터 기능을 위한 Import
import { createBrowserRouter, RouterProvider} from 'react-router-dom';

import HomePage from './pages/home.tsx';
import Movies from './pages/movies.tsx';
import NotFound from './pages/not-found.tsx';
import RootLayout from './layout/root-layout.tsx';
import SearchPage from './pages/search.tsx';

// createBrowserRouter: 원하는 path를 통해, 해당 경로에 접근하면 어떤 element를 보여주게 될지 정의
const router = createBrowserRouter([
  {
      path: '/', // 처음 실행했을 때 페이지. localhost:5173
      element: <RootLayout/>, // 중첩라우트 사용
      errorElement: <NotFound/>, // 없는 경로에 들어왔을 때 처리

      children: [
        {
          index: true,  // index: true는 -> 위의 path: '/', 즉 home 경로를 의미함
          element: <HomePage/> // localhost:5173/
        },
        {
          // 부모의 path가 '/'이니 이를 상속받음.
          // '/'를 붙이지 않아도 '/movies'와 동일하게 동작.
          // '/:'를 활용해서, 동적으로 바뀌는 부분의 이름을 정의.
          path: 'movies/:movieId',

          element: <Movies/> // localhost:5173/movies
        },
        {
          path: 'search',
          element: <SearchPage/> // localhost:5173/search
        }
      ]
  },
  /*
  {
      path: '/movies', // localhost:5173/movies
      element: <Movies/>,
  },
  {
      path: '/search', // localhost:5173/search
      element: <SearchPage/>,
  }
  */
])

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App
