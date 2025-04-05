import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieDetailPage from "./pages/MovieDetail";
import HomePage from "./pages/Home.tsx"; 

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 홈 페이지 */}
        <Route path="/" element={<HomePage />} />

        {/* 영화 상세 페이지 */}
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
