import { useEffect, useState } from 'react';
import type { FC } from 'react';
import axios from 'axios';
import { Movie, MovieResponse } from '../types/movie';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const UpcomingPage: FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { data } = await axios.get<MovieResponse>(
          'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
            },
          }
        );

        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('개봉 예정 영화 데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default UpcomingPage;