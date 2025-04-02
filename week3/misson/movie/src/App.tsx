// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layout/root-layout';
import Home from './pages/home';
import NotFound from './pages/not-found';
import MovieDetailPage from './pages/moviedetail';
import MoviePageTemplate from './pages/MoviePageTemplate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {/* index는 "/" 경로에 해당 */}
          <Route index element={<Home />} />
          <Route path="/:categoryType" element={<MoviePageTemplate/>} />
          <Route path="movie/:movieId" element={<MovieDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
