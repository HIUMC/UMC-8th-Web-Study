import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage"; 
import Layout from "./Layout";
import { MovieDetail } from "./pages/MovieDetail";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies/:category" element={<MoviePage />} /> 
          <Route path='movies/:category/:id' element={<MovieDetail/>}/>
        </Route>  
      </Routes>
    </Router>
  );
}

export default App;