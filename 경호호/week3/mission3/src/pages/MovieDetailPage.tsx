import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Credits, Cast, Crew } from '../types/movie';

interface MovieDetail {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genres: { id: number; name: string }[];
  runtime: number;
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
}

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 영화 상세 정보 가져오기
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!movieResponse.ok) {
          throw new Error('영화 상세 정보를 불러오는데 실패했습니다.');
        }

        const movieData = await movieResponse.json();
        setMovie(movieData);
        
        // 영화 Credits(배우, 감독) 정보 가져오기
        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (!creditsResponse.ok) {
          throw new Error('영화 출연/제작진 정보를 불러오는데 실패했습니다.');
        }
        
        const creditsData = await creditsResponse.json();
        setCredits(creditsData);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetail();
    }
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  // 금액 포맷팅 함수
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // 감독 정보 가져오기
  const getDirectors = () => {
    if (!credits) return [];
    return credits.crew.filter(person => person.job === 'Director');
  };

  // 주요 출연진 가져오기 (상위 10명)
  const getMainCast = () => {
    if (!credits) return [];
    return credits.cast.slice(0, 10);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <ErrorMessage message="영화 정보를 찾을 수 없습니다." />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 배경 이미지 전체 화면 커버 */}
      <div 
        className="fixed inset-0 -z-10 opacity-20" 
        style={{ 
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(2px)'
        }}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-black/20 to-black/60" />

      {/* 메인 콘텐츠 */}
      <div className="w-full px-8 py-8">
        {/* 영화 상단 정보 섹션 */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* 포스터 */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-xl shadow-2xl"
            />
          </div>
          
          {/* 영화 정보 */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">{movie.title}</h1>
            
            {movie.tagline && (
              <p className="text-gray-600 italic text-xl mb-6">"{movie.tagline}"</p>
            )}
            
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
                  {genre.name}
                </span>
              ))}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg">
                <p className="text-gray-500 text-sm mb-1">개봉일</p>
                <p className="font-medium">{movie.release_date}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg">
                <p className="text-gray-500 text-sm mb-1">상영 시간</p>
                <p className="font-medium">{movie.runtime}분</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg">
                <p className="text-gray-500 text-sm mb-1">평점</p>
                <p className="font-medium flex items-center">
                  <span className="text-yellow-500 mr-1">⭐</span> 
                  {movie.vote_average.toFixed(1)} ({movie.vote_count.toLocaleString()})
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg">
                <p className="text-gray-500 text-sm mb-1">상태</p>
                <p className="font-medium">{movie.status}</p>
              </div>
            </div>
            
            {(movie.budget > 0 || movie.revenue > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {movie.budget > 0 && (
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg">
                    <p className="text-gray-500 text-sm mb-1">제작비</p>
                    <p className="font-medium">{formatCurrency(movie.budget)}</p>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg">
                    <p className="text-gray-500 text-sm mb-1">수익</p>
                    <p className="font-medium">{formatCurrency(movie.revenue)}</p>
                  </div>
                )}
              </div>
            )}
            
            <div className="mb-8 bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">줄거리</h2>
              <p className="text-lg leading-relaxed">
                {movie.overview || "줄거리 정보가 없습니다."}
              </p>
            </div>
          </div>
        </div>
        
        {/* 감독 섹션 */}
        {credits && getDirectors().length > 0 && (
          <div className="mt-12 mb-10">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">감독</h2>
            <div className="flex flex-wrap gap-8">
              {getDirectors().map((director) => (
                <div key={director.id} className="flex flex-col items-center">
                  <div className="w-32 h-32 mb-3 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 shadow-lg">
                    {director.profile_path ? (
                      <img 
                        src={`https://image.tmdb.org/t/p/w185${director.profile_path}`}
                        alt={director.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <p className="text-center font-medium text-lg">{director.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 출연진 섹션 */}
        {credits && getMainCast().length > 0 && (
          <div className="mt-12 mb-10">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">주요 출연진</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-6">
              {getMainCast().map((actor) => (
                <div key={actor.id} className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
                  <div className="h-60 bg-gray-200">
                    {actor.profile_path ? (
                      <img 
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                        alt={actor.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-medium text-lg">{actor.name}</p>
                    <p className="text-gray-500 mt-1">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 뒤로 가기 버튼 */}
        <div className="mt-10 mb-4">
          <button
            onClick={handleGoBack}
            className="bg-blue-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg"
          >
            뒤로 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage; 