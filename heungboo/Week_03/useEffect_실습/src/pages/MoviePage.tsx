import { Movie, MovieResponse } from "../types/movie";
import { useEffect, useState } from "react";
import axios from "axios";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  console.log(movies);

  useEffect(() => {
    // 응답에 대한 타입을 정의해줍니다.
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
        {
          headers: {
            Authorization: `Bearer Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTliODMwNzBlNWRmNzAwNzY1NjQ2MDk4YTI5Y2ZkMCIsIm5iZiI6MTc0MzU3MTQyNy45MDksInN1YiI6IjY3ZWNjOWUzODM2YzhlZGE3Y2FhZTJiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.epYvHDgvpLmih04BReQfJVTSrT1sqFkBRK-eQv_oUyM`,
          },
        }
      );
      setMovies(data.results);
    };
    fetchMovies();
  }, []);

  return (
    <>
      <h1>영화 데이터 불러오기</h1>
    </>
  );
};
export default MoviesPage;
