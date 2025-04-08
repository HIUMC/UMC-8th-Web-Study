import { useParams } from 'react-router-dom';
import { useCustomFetch } from '../hooks/useCustomFetch';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { MovieDetail } from '../types/movie';

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const API_URL = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
  const CREDITS_URL = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`;
  
  const { data: movieData, loading: movieLoading, error: movieError } = useCustomFetch<MovieDetail>(API_URL);
  const { data: creditsData, loading: creditsLoading, error: creditsError } = useCustomFetch<{ cast: any[]; crew: any[] }>(CREDITS_URL);

  if (movieLoading || creditsLoading) return <LoadingSpinner />;
  if (movieError) return <ErrorMessage message={movieError.message} />;
  if (creditsError) return <ErrorMessage message={creditsError.message} />;
  if (!movieData || !creditsData) return <ErrorMessage message="영화 정보를 불러올 수 없습니다." />;

  const director = creditsData.crew.find((person) => person.job === 'Director');
  const mainCast = creditsData.cast.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div
        className="relative h-[60vh] bg-cover bg-center rounded-b-3xl overflow-hidden"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative h-full flex items-end">
          <div className="flex gap-8 pb-16">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
              alt={movieData.title}
              className="w-64 rounded-xl shadow-xl"
            />
            <div className="flex flex-col justify-end">
              <h1 className="text-4xl font-bold mb-4">{movieData.title}</h1>
              <div className="flex gap-4 mb-4">
                <span>{movieData.release_date.split('-')[0]}</span>
                <span>{movieData.runtime}분</span>
                <span>평점: {movieData.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex gap-2 mb-4">
                {movieData.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-blue-500 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className="text-lg mb-4">{movieData.overview}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">감독</h2>
          {director && (
            <div className="flex items-center gap-4 bg-gray-800 p-4 rounded-xl">
              {director.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${director.profile_path}`}
                  alt={director.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className="text-xl font-semibold">{director.name}</h3>
                <p className="text-gray-400">감독</p>
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">주요 출연진</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {mainCast.map((actor) => (
              <div key={actor.id} className="bg-gray-800 rounded-xl p-4 text-center">
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-700 rounded-lg mb-2 flex items-center justify-center">
                    <span className="text-gray-400">이미지 없음</span>
                  </div>
                )}
                <h3 className="font-semibold">{actor.name}</h3>
                <p className="text-gray-400 text-sm">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage; 