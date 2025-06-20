import type { Movie } from "../types/movie";
import fallbackImage from "../assets/no-poster.png";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const backdropBaseUrl = "https://image.tmdb.org/t/p/original";

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative bg-white rounded-xl w-full max-w-3xl overflow-hidden">
        {/* 상단 가로 이미지 */}
        {movie.backdrop_path && (
          <div className="relative h-48 w-full">
            <img
              src={`${backdropBaseUrl}${movie.backdrop_path}`}
              alt="backdrop"
              className="w-full h-full object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
            >
              ✕
            </button>
            <div className="absolute bottom-4 left-6 text-white">
              <h2 className="text-2xl font-bold">{movie.title}</h2>
              <p className="text-sm italic">{movie.original_title}</p>
            </div>
          </div>
        )}

        {/* 본문 */}
        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* 왼쪽 포스터 */}
          <img
            src={
              movie.poster_path
                ? `${imageBaseUrl}${movie.poster_path}`
                : fallbackImage
            }
            alt={movie.title}
            className="w-44 h-[264px] object-cover rounded-md mx-auto md:mx-0"
          />

          {/* 오른쪽 텍스트 정보 */}
          <div className="flex flex-col gap-2 flex-1">
            {/* 평점 */}
            <div className="flex items-center gap-2">
              <span className="text-violet-500 font-bold text-lg">
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-sm text-gray-500">
                ({movie.vote_count} 평가)
              </span>
            </div>

            {/* 개봉일 */}
            <p className="text-sm text-gray-700">
              <strong>개봉일</strong> <br />
              {movie.release_date || "정보 없음"}
            </p>

            {/* 인기도 */}
            <p className="text-sm text-gray-700 font-semibold">인기도</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
                style={{ width: `${Math.min(movie.popularity, 100)}%` }}
              ></div>
            </div>

            {/* 줄거리 */}
            <p className="text-sm mt-4 text-gray-800 whitespace-pre-line leading-relaxed">
              {movie.overview || "줄거리 정보가 없습니다."}
            </p>

            {/* 버튼 영역 */}
            <div className="mt-6 flex justify-center gap-4">
              <a
                href={`https://www.imdb.com/find?q=${encodeURIComponent(
                  movie.title
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
             hover:brightness-110 text-white font-semibold py-2 px-4 rounded 
             flex items-center gap-2 shadow transform hover:scale-105 
             transition-transform duration-200"
              >
                IMDb에서 검색
              </a>
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
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
