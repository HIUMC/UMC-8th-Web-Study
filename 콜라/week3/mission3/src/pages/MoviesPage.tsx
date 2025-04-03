import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { category } = useParams();
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsPending(true);
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZWY2NDFmMTEzMDlmZTYzZTRjN2I4OTZjYjg2NTUxZCIsIm5iZiI6MTc0MzQ5NzA4OS44NzM5OTk4LCJzdWIiOiI2N2ViYTc4MTAzYmFiZGNlZDI3YWIwZmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.t9-PZYnYZqh8sS6vLruqbuEABmvx9L8_vzAXIldYG5Q",
            },
          }
        );
        setMovies(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovies();
  }, [page, category]);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <div className="mx-5 flex flex-col gap-y-7">
      <div className="flex items-center justify-center gap-6">
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          {"<"}
        </button>
        <span>{page} 페이지</span>
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer"
          onClick={() => setPage((prev) => prev + 1)}
        >
          {">"}
        </button>
      </div>

      {isPending && (
        <div className="flex justify-center items-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies?.map((movie) => (
            <li
              key={movie.id}
              className="relative shadow-xl rounded-xl overflow-hidden group"
            >
              <Link to={`/movie/${movie.id}`}>
                <img
                  className="w-full h-auto object-cover"
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col justify-center items-center text-white px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-bold text-center mb-2">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-center line-clamp-3">
                    {movie.overview}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesPage;
