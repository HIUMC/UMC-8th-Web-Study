
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import NowPlaying from "./components/NowPlaying"
import Popular from "./components/popular"
import TopRated from "./components/TopRated"
import UpComing from "./components/UpComing"
import Layout from './Layout';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="NowPlaying" element={<NowPlaying />} />
          <Route path="Popular" element={<Popular />} />
          <Route path="TopRated" element={<TopRated />} />
          <Route path="UpComing" element={<UpComing />} />
        </Route>
      </Routes>
    </Router>
   
  )
}

export default App;
