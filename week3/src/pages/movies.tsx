import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";
import axios from "axios";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
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
    <ul>
      {movies?.map((movie) => (
        <li key={movie.id}>
          <h1>{movie.title}</h1>
        </li>
      ))}
    </ul>
  );
};

export default MoviesPage;
