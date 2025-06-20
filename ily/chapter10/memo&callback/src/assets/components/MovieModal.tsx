import type { Movie } from "../types/movies";
import { useEffect } from "react";
interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  console.log("MovieModal에서 작성된 :", movie);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-sm">
      <div className="bg-white justify-center items-center flex flex-col p-6 rounded-lg shadow-lg w-1/2 h-6/7 overflow-auto">
        <div>
          <button
            onClick={onClose}
            className="cursor-pointer absolute right-2 bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-colors"
          >
            X
          </button>
          <img
            src={`${imageBaseUrl}${movie.backdrop_path}`}
            alt={`${imageBaseUrl}${movie.title} 포스터`}
            className="rounded-lg shadow-lg mb-4"
          ></img>
        </div>
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg">
          <div>
            <img src={`${imageBaseUrl}${movie.poster_path}`}></img>
          </div>
          <div className="flex flex-col p-4">
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            <p className="text-gray-700 mb-4">{movie.overview}</p>
            <p className="text-gray-500">
              Release Date: {new Date(movie.release_date).toLocaleDateString()}
            </p>
            <p className="text-gray-500">Language: {movie.original_language}</p>
            <p className="text-gray-500">Vote Average: {movie.vote_average}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
