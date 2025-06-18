import React from "react";
import { Movie } from "../../types/movie";

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie;
}

const MovieModal = ({
  isOpen,
  onClose,
  movie,
}: MovieModalProps): React.ReactElement | null => {
  if (!isOpen) return null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : "https://via.placeholder.com/1280x720?text=No+Backdrop";

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  const imdbUrl = movie.id
    ? `https://www.themoviedb.org/movie/${movie.id}`
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>

        {/* 배경 이미지 */}
        <div
          className="relative h-80 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backdropUrl})`,
            filter: "blur(0.5px)", // 배경을 뿌옇게 처리
          }}
        >
          {/* 제목과 원제목 */}
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-3xl font-bold">{movie.title}</h2>
            <p className="text-lg text-gray-300">{movie.original_title}</p>
          </div>
        </div>

        {/* 내용 */}
        <div className="p-6 flex">
          {/* 왼쪽: 포스터 */}
          <div className="w-1/3">
            <img
              src={posterUrl}
              alt={`${movie.title} 포스터`}
              className="w-full h-auto rounded-md"
            />
          </div>

          {/* 오른쪽: 상세 정보 */}
          <div className="w-2/3 pl-6">
            {/* <h2 className="text-2xl font-bold mb-4">{movie.title}</h2> */}
            <div className="flex flex-row items-center">
              <p className="text-2xl font-bold text-red-600 mr-2">
                {movie.vote_average.toFixed(1)}
              </p>
              <p className="text-sm  text-gray-600 justify-items-center">
                ({movie.vote_count} 평가)
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 text-lg text-black font-bold mb-2">
              <div className="text-center">
                <p>개봉일</p>
                <p>{movie.release_date}</p>
              </div>

              <div className="w-full">
                <p className="text-center mb-2">인기도</p>
                <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${Math.min(movie.popularity, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-center">
                <p className="p-4 mb-4">줄거리</p>
                <p className="text-sm text-gray-500">
                  {movie.overview || "줄거리 정보가 없습니다."}
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              {imdbUrl && (
                <a
                  href={imdbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
                >
                  IMDB에서 검색
                </a>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition"
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
