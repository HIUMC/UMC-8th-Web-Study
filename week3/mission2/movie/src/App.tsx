import { ReactElement } from 'react';
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import MoviePage from './pages/MoviePage';
import MovieDetailPage from './pages/MovieDetailPage';

//BrowserRouter v5
//createBrowserRouter v6
//react-router-dom v7(next.js, remix)
const router= createBrowserRouter([
  {
    path:'/',
    element:<HomePage />,
    errorElement:<NotFoundPage/>,
    children:[
      {
        path:'movies/:category',
        element:<MoviePage/>,
        index:true,
      },
      {
        path:'movies/:movieId',
        element:<MovieDetailPage/>
      }
    ],
  },
]);

function App(): ReactElement{
  return <RouterProvider router={router}/>
}
export default App;
