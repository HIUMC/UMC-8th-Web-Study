import { ReactElement, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Movie } from "../types/movie";

export default function MoviePage(): ReactElement {
  const { category } = useParams<{ category: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_KEY; 
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
          }
        );
        setMovies(response.data.results);
        setTotalPages(Math.min(response.data.total_pages, 500)); // TMDB API는 최대 500페이지까지만 제공
      } catch (err) {
        setError("영화 데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category, currentPage]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-6">
          {category === "popular"
            ? "인기 영화"
            : category === "top_rated"
            ? "평점 높은 영화"
            : "현재 상영중인 영화"}
        </h1>
        
        {/* 페이지네이션 */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <button
            onClick={() => setCurrentPage(prev => prev - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200
              ${currentPage === 1 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            이전
          </button>
          <span className="text-lg font-medium">
            {currentPage} / {totalPages} 페이지
          </span>
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200
              ${currentPage === totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            다음
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="aspect-[2/3] cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}