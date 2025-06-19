import type { Movie } from '../types/movie';
import MovieCard from './MovieCard';


interface MovieListProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void; // 영화 선택 시 상위로 전달
}

const MovieList = ({ movies, onSelect }: MovieListProps) => {
  if (movies.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="font-bold text-gray-500">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => onSelect(movie)} // 클릭 시 부모에게 알림
        />
      ))}
    </div>
  );
};

export default MovieList;