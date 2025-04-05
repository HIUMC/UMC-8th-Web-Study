import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MoviePage from './pages/MoviePage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from './pages/MovieDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:category" element={<MoviePage />} />
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;