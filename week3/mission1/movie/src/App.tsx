import { ReactElement } from 'react';
import './App.css'
import MoviePage from './pages/MoviePage';

function App(): ReactElement{
  return (
  <>
  <MoviePage/>
  </>
  );
}
console.log(import.meta.env.VITE_TMDB_KEY); 
export default App;
