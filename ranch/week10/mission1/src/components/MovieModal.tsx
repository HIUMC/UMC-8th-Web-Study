import type { Movie } from "../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl overflow-hidden">
        {/* 🔙 뒤로가기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-blue-600 text-lg cursor-pointer"
          aria-label="뒤로가기"
        >
          🔙
        </button>

        {/* 내부 스크롤 영역 */}
        <div className="p-6 pt-14 max-h-[80vh] overflow-y-auto">
          {/* 제목 */}
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            {movie.title}
          </h2>

          {/* 포스터 */}
          <div className="flex justify-center mb-6">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="w-[200px] rounded-xl shadow-md"
            />
          </div>

{/* 개요 */}
<div className="text-left text-gray-700 text-sm mb-4 whitespace-pre-wrap leading-relaxed">
  <div className="text-base font-semibold text-gray-800 mb-1">📖 개요</div>
  {movie.overview || "내용이 없습니다."}
</div>

{/* 평점 */}
<div className="text-left text-gray-700 text-sm flex items-center gap-2">
  <span className="text-base font-semibold text-gray-800">⭐ 평점</span>
  <span>{movie.vote_average.toFixed(1)}</span>
</div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
