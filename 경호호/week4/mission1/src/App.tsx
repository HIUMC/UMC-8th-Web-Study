import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import MovieListPage from './pages/MovieListPage'
import MovieDetailPage from './pages/MovieDetailPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/:category" element={<MovieListPage />} />
          <Route path="/movies" element={<MovieListPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
