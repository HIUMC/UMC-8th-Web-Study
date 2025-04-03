import React, { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // TMDB의 Popular Movie 데이터 가져오기
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("영화 데이터를 불러오는 중 에러가 발생했습니다:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center py-6">Popular Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 pb-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

function MovieCard({ movie }) {
  const { title, overview, poster_path } = movie;

  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg">
      {/* 영화 포스터 */}
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      {/* 호버 시 나타날 영역 */}
      <div
        className="
          absolute inset-0 
          flex flex-col justify-center items-center 
          text-center text-white 
          bg-black bg-opacity-0 
          backdrop-blur-0
          transition-all duration-300 
          ease-in-out 
          group-hover:bg-opacity-60 
          group-hover:backdrop-blur-sm
          p-4
        "
      >
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm mt-2 line-clamp-3">
          {overview}
        </p>
      </div>
    </div>
  );
}

export default App;
