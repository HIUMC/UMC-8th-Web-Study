import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";
import axios from "axios";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZWY2NDFmMTEzMDlmZTYzZTRjN2I4OTZjYjg2NTUxZCIsIm5iZiI6MTc0MzQ5NzA4OS44NzM5OTk4LCJzdWIiOiI2N2ViYTc4MTAzYmFiZGNlZDI3YWIwZmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.t9-PZYnYZqh8sS6vLruqbuEABmvx9L8_vzAXIldYG5Q",
          },
        }
      );
      setMovies(data.results);
    };
    fetchMovies();
  }, []);

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {movies?.map((movie) => (
        <li
          key={movie.id}
          className="relative shadow-xl rounded-xl overflow-hidden group"
        >
          <img
            className="w-full h-auto object-cover"
            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col justify-center items-center text-white px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-lg font-bold text-center mb-2">
              {movie.title}
            </h3>
            <p className="text-sm text-center line-clamp-3">{movie.overview}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MoviesPage;
