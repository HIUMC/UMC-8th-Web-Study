import { useState } from "react";
import { Movie } from "../types/movie";
import MovieModal from "./Modal/MovieModal";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Card 클릭 시 Modal 열기
  const handleCardClick = (): void => {
    setIsModalOpen(true);
  };

  // Modal 닫기
  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  const ImageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImage = "public\blob.png";
  return (
    <>
      <div
        className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md 
  transition-all hover:shadow-lg"
        onClick={handleCardClick}
      >
        <div className="overflow-hidden relative h-80">
          <img
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            src={
              movie.poster_path
                ? `${ImageBaseUrl}${movie.poster_path}`
                : fallbackImage
            }
            alt={`${movie.title} 포스터`}
          />
          <div className="absolute right-2 top-2 rounded-md bg-black px-2 py-1 text-sm font-bold text-white">
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
        <div className="p-4 items-center justify-center">
          <div className="flex flex-col justify-center items-center">
            <h3 className="mb-2 text-lg font-bold text-gray-800">
              {movie.title}
            </h3>
            <p className="text-sm text-gray-600 ">
              {movie.release_date} | {movie.original_language.toUpperCase()}
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-700">
            {movie.overview.length > 100
              ? `${movie.overview.slice(0, 100)}...`
              : movie.overview}
          </p>
        </div>
      </div>
      <MovieModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        movie={movie}
      />
    </>
  );
};

export default MovieCard;
