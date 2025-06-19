import type { Movie } from '../types/movie';

interface ModalProps {
  movie: Movie;
  onClose: () => void;
}

const Modal = ({ movie, onClose }: ModalProps) => {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const backdropBaseUrl = 'https://image.tmdb.org/t/p/original';

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-white rounded-lg overflow-hidden w-[90%] max-w-3xl shadow-lg relative">
        {/* 상단 배경 */}
        <div className="relative h-56 bg-black">
          <img
            src={`${backdropBaseUrl}${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover opacity-60"
          />
          <button
            className="absolute top-3 right-4 text-white text-2xl font-bold"
            onClick={onClose}
          >
            ✕
          </button>
          <div className="absolute bottom-2 left-4 text-white">
            <h2 className="text-2xl font-bold">{movie.title}</h2>
            <p className="text-sm text-gray-200">{movie.original_title}</p>
          </div>
        </div>

        {/* 본문 내용 */}
        <div className="flex flex-col md:flex-row gap-4 p-6">
          {/* 포스터 */}
          <div className="w-full md:w-1/3">
            <img
              src={`${imageBaseUrl}${movie.poster_path}`}
              alt={movie.title}
              className="rounded"
            />
          </div>

          {/* 상세 정보 */}
          <div className="w-full md:w-2/3">
            <div className="mb-2">
              <span className="text-blue-500 font-semibold text-lg">{movie.vote_average.toFixed(1)}</span>
              <span className="ml-2 text-sm text-gray-500">{movie.release_date}</span>
            </div>
            <div>
              <h3 className="font-semibold text-md mb-1">줄거리</h3>
              <p className="text-sm text-gray-700">{movie.overview || '줄거리 정보가 없습니다.'}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <a
                href={`https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
              >
                IMDb에서 검색
              </a>
              <button
                onClick={onClose}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 text-sm"
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

export default Modal;
