import type { Movie } from "../types/Movie";

interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}


function MovieModal({movie, onClose }:MovieModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray bg-opacity-50 backdrop-blur-sm z-50 overflow-auto p-4">
          <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl flex flex-col md:flex-row gap-6">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <img
              src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
              alt={movie.title}
              className="w-full md:w-1/3 h-auto rounded-lg"
            />
            <div className="flex flex-col flex-1">
              <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>
              <p className="text-gray-700 mb-4 overflow-y-auto">{movie.overview}</p>
              <div className="flex justify-between text-sm text-gray-500 mt-auto">
                <p>📅 {movie.release_date}</p>
                <p>⭐ {movie.vote_average}</p>
              </div>
            </div>
          </div>
        </div>
      );
    
}

export default MovieModal;