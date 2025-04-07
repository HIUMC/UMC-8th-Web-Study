import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Credit, MovieDetail } from '../types/movie';


const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<Credit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_KEY; 
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const [movieResponse, creditsResponse] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
              },
            }
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                'Content-Type': 'application/json',
              },
            }
          ),
        ]);

        if (!movieResponse.ok || !creditsResponse.ok) {
          throw new Error('데이터를 불러오는데 실패했습니다.');
        }

        const movieData = await movieResponse.json();
        const creditsData = await creditsResponse.json();

        setMovie(movieData);
        setCredits(creditsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!movie || !credits) {
    return null;
  }

  const director = credits.crew.find((person) => person.job === 'Director');
  const mainCast = credits.cast.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div
        className="relative h-[60vh] bg-cover bg-center rounded-b-3xl overflow-hidden"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative h-full flex items-end">
          <div className="flex gap-8 pb-16">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-64 rounded-xl shadow-xl"
            />
            <div className="flex flex-col justify-end">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              <div className="flex gap-4 mb-4">
                <span>{movie.release_date.split('-')[0]}</span>
                <span>{movie.runtime}분</span>
                <span>평점: {movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex gap-2 mb-4">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-blue-500 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className="text-lg mb-4">{movie.overview}</p>
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