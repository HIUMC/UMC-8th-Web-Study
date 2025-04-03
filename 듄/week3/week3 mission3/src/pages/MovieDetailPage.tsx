import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import type { FC } from 'react';
import { Movie } from '../types/movie';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

interface Credit {
  id: number;
  cast: Array<{
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }>;
  crew: Array<{
    id: number;
    name: string;
    job: string;
    profile_path: string | null;
  }>;
}

const MovieDetailPage: FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<Credit | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [movieResponse, creditsResponse] = await Promise.all([
          axios.get<Movie>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
              },
            }
          ),
          axios.get<Credit>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
              },
            }
          ),
        ]);

        setMovie(movieResponse.data);
        setCredits(creditsResponse.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('영화 정보를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !movie || !credits) {
    return <ErrorMessage message={error || '영화 정보를 찾을 수 없습니다.'} />;
  }

  const director = credits.crew.find((member) => member.job === 'Director');
  const mainCast = credits.cast.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 배경 이미지 섹션 */}
      <div className="relative h-[60vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <div className="flex gap-4 text-sm">
              <span>{movie.release_date.split('-')[0]}년</span>
              <span>{movie.vote_average.toFixed(1)}점</span>
            </div>
          </div>
        </div>
      </div>

      {/* 상세 정보 섹션 */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 왼쪽: 포스터 */}
          <div className="md:col-span-1">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* 오른쪽: 상세 정보 */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">영화 정보</h2>
              <p className="text-gray-700 mb-6">{movie.overview}</p>
            </div>

            {/* 감독 섹션 */}
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">감독</h2>
              {director && (
                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 flex-shrink-0">
                    <img
                      src={
                        director.profile_path
                          ? `https://image.tmdb.org/t/p/w200${director.profile_path}`
                          : 'https://via.placeholder.com/200x300?text=No+Image'
                      }
                      alt={director.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{director.name}</h3>
                    <p className="text-gray-600">감독</p>
                  </div>
                </div>
              )}
            </div>

            {/* 출연진 섹션 */}
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">주요 출연진</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {mainCast.map((actor) => (
                  <div key={actor.id} className="text-center">
                    <div className="relative w-full aspect-[2/3] mb-3">
                      <img
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                            : 'https://via.placeholder.com/200x300?text=No+Image'
                        }
                        alt={actor.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">{actor.name}</h3>
                    <p className="text-sm text-gray-600">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage; 