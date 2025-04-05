import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieDetail, fetchMovieCredits } from "../services/MovieService";
import { MovieDetail, MovieCredits } from "../types/movie";
import CastList from "../components/CastList";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<MovieCredits | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMovieData = async () => {
      try {
        if (!movieId) throw new Error("영화 ID가 없습니다.");
        setLoading(true);
        const movieData = await fetchMovieDetail(movieId);
        const creditData = await fetchMovieCredits(movieId);
        setMovie(movieData);
        setCredits(creditData);
      } catch (err) {
        setError("데이터를 불러오는 중 문제가 발생했습니다.");
        console.error("영화 데이터 로딩 에러:", err);
      } finally {
        setLoading(false);
      }
    };

    getMovieData();
  }, [movieId]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return <ErrorMessage message="영화 정보가 없습니다." />;

  // 개봉일 포맷 함수
  const formatReleaseDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // 러닝타임 포맷 함수
  const formatRuntime = (minutes: number) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* 배경 이미지 */}
      <div 
        className="w-full h-96 bg-cover bg-center opacity-30 absolute top-0 left-0 z-0"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      />
      
      {/* 메인 콘텐츠 */}
      <div className="relative z-10 p-6 pt-10 max-w-6xl mx-auto">
        {/* 뒤로가기 링크 */}
        <Link to="/" className="inline-block mb-8 px-4 py-2 bg-gray-800 rounded-full hover:bg-gray-700 transition">
          ← 홈으로 돌아가기
        </Link>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* 포스터 */}
          <div className="w-full md:w-1/3">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
              className="rounded-lg shadow-xl w-full"
            />
          </div>
          
          {/* 영화 정보 */}
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <p className="text-gray-400 mb-6">
              {movie.release_date && formatReleaseDate(movie.release_date)} • 
              {movie.runtime && ` ${formatRuntime(movie.runtime)} • `}
              {movie.vote_average && ` 평점 ${movie.vote_average.toFixed(1)}/10`}
            </p>
            
            {/* 장르 */}
            {movie.genres && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map(genre => (
                  <span key={genre.id} className="px-3 py-1 bg-blue-800 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
            
            {/* 줄거리 */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">줄거리</h2>
              <p className="text-gray-300 leading-relaxed">
                {movie.overview || "줄거리 정보가 없습니다."}
              </p>
            </div>
            
            {/* 기타 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {movie.production_companies && movie.production_companies.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-400">제작사</h3>
                  <p>{movie.production_companies.map(company => company.name).join(', ')}</p>
                </div>
              )}
              
              {movie.production_countries && movie.production_countries.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-400">제작 국가</h3>
                  <p>{movie.production_countries.map(country => country.name).join(', ')}</p>
                </div>
              )}
              
              {movie.budget > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-400">제작비</h3>
                  <p>${movie.budget.toLocaleString()}</p>
                </div>
              )}
              
              {movie.revenue > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-400">수익</h3>
                  <p>${movie.revenue.toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 출연진 정보 */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">출연진</h2>
          {credits && credits.cast && credits.cast.length > 0 ? (
            <CastList cast={credits.cast} />
          ) : (
            <p className="text-gray-400">출연진 정보가 없습니다.</p>
          )}
        </div>
        
        {/* 감독 정보 */}
        {credits && credits.crew && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">제작진</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {credits.crew
                .filter(person => ["Director", "Producer", "Screenplay", "Writer"].includes(person.job))
                .map(person => (
                  <div key={`${person.id}-${person.job}`} className="text-center">
                    <img 
                      src={person.profile_path 
                        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                        : "https://via.placeholder.com/185x278?text=No+Image"}
                      alt={person.name} 
                      className="rounded-lg mx-auto mb-2"
                    />
                    <p className="font-medium">{person.name}</p>
                    <p className="text-sm text-gray-400">{person.job}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
