// components/MovieModal.tsx
import type { MovieResponse } from '../types/movie';

interface Props {
  movie: MovieResponse['results'][number];
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
        <p>{movie.overview || '줄거리가 없습니다.'}</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          닫기
        </button>
      </div>
    </div>
  );
}
