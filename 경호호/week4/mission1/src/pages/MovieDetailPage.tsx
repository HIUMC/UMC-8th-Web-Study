import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import { Movie } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const url = `${BASE_URL}/movie/${id}`;
  
  const { data: movie, loading, error, refetch } = useFetch<Movie>(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    params: {
      language: 'ko-KR',
    },
  });
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return (
      <div className="py-8">
        <ErrorDisplay message={`영화 상세 정보를 불러오는 중 오류가 발생했습니다: ${error}`} />
        <button 
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mx-auto block"
        >
          다시 시도
        </button>
      </div>
    );
  }
  
  if (!movie) {
    return <div className="text-center py-10">영화 정보를 찾을 수 없습니다.</div>;
  }
  
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';
    
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;
    
  return (
    <div className="animate-fadeIn">
      {backdropUrl && (
        <div className="relative h-64 sm:h-96 mb-6 -mx-2 sm:-mx-4">
          <div className="absolute inset-0 bg-black/60"></div>
          <img 
            src={backdropUrl} 
            alt={movie.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
            <h1 className="text-2xl sm:text-4xl font-bold">{movie.title}</h1>
            <p className="text-sm sm:text-base mt-2">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : '정보 없음'} • 
              평점: {movie.vote_average?.toFixed(1) || '정보 없음'}
            </p>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <img 
            src={posterUrl} 
            alt={movie.title} 
            className="w-full rounded-lg shadow-lg" 
          />
        </div>
        
        <div className="md:col-span-2">
          {!backdropUrl && (
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">{movie.title}</h1>
          )}
          
          <h2 className="text-xl font-semibold mb-2">줄거리</h2>
          <p className="text-gray-700 mb-6">
            {movie.overview || '줄거리 정보가 없습니다.'}
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold">개봉일</h3>
              <p>{movie.release_date || '정보 없음'}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">평점</h3>
              <p>⭐ {movie.vote_average?.toFixed(1) || '정보 없음'} ({movie.vote_count || 0}명)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage; 