import type { Movie } from '../types/movie';
import { FiX } from 'react-icons/fi';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const backdrop = movie.backdrop_path
    ? `${imageBaseUrl}${movie.backdrop_path}`
    : 'https://placehold.com/800x450';
  const poster = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : 'https://placehold.com/300x450';

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
    >
      <div className="relative w-full sm:max-w-xl md:max-w-3xl bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="relative h-64 w-full">
          <img src={backdrop} alt={movie.title} className="w-full sm:h-60 md:h-full object-cover" />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white bg-black/60 p-2 rounded-full"
          >
            <FiX className="size-4 cursor-pointer" />
          </button>
        </div>

        <div className="flex gap-6 sm:p-3 md:p-6">
          <img
            src={poster}
            alt={movie.title}
            className="sm:w-40 md:w-48 h-full object-cover rounded-lg shadow-md"
          />

          <div className="flex flex-col sm:gap-1 md:gap-2 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-blue-600 font-semibold">{movie.vote_average.toFixed(1)}</span>
              <span className="text-gray-400 text-sm">({movie.vote_count} 평가)</span>
            </div>

            <h2 className="text-xl font-bold">{movie.title}</h2>
            <div className="text-sm text-gray-600">{movie.release_date} 개봉</div>

            <div className="text-sm text-gray-500 mt-2">인기도: {movie.popularity.toFixed(1)}</div>

            <div className="mt-3 text-sm text-gray-700">{movie.overview}</div>

            <div className="mt-5 flex gap-3">
              <a
                href={`https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`}
                target="_blank"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
              >
                IMDb에서 검색
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-100 cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
