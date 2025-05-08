//import { useParams } from "react-router-dom";
import { Movie, MovieResponse } from "../types/movie";
import { useState, useEffect } from "react";
import axios from "axios";

const MoviesPage = () => {
  //const params = useParams();

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        },
      );
      setMovies(data.results);
    };
    fetchMovies();
  }, []);

  console.log(movies);
  return (
    <div>
      <h1>영화 목록 페이지</h1>
      <div className="flex flex-wrap gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative w-[10%] max-w-[200px] aspect-[2/3] overflow-hidden rounded-[10px] group"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto object-cover transition-all duration-300 group-hover:blur-sm"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white text-center px-2">
              <h2 className="text-sm font-bold mb-1">{movie.title}</h2>
              <p className="text-xs line-clamp-4">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
