import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Genre,
  ProductionCountry,
  SpokenLanguage,
  MovieDetail,
} from "../types/moviedetail";
import { MovieCredit, CastMember, CrewMember } from "../types/moviecredit";

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<MovieCredit | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const [movieRes, creditRes] = await Promise.all([
          axios.get<MovieDetail>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
          axios.get<MovieCredit>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
        ]);
        setMovie(movieRes.data);
        setCredits(creditRes.data);
      } catch (err) {
        console.error(err);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    if (movieId) fetchData();
  }, [movieId]);

  if (isPending) return <div>로딩 중...</div>;
  if (isError) return <div className="text-red-500">에러가 발생했습니다.</div>;
  if (!movie) return null;

  const director = credits?.crew.find(
    (crew: CrewMember) => crew.job === "Director"
  );
  const cast = credits?.cast.slice(0, 20) || [];

  return (
    <div className="text-black">
      {/* 배경 이미지 */}
      <div
        className="relative w-full h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 p-8 flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-4 text-white">{movie.title}</h1>
          <p className="text-lg mb-1 text-white">
            평균 ⭐ {movie.vote_average}
          </p>
          <p className="text-lg mb-1 text-white">
            {movie.release_date} | {movie.runtime}분
          </p>
          {movie.tagline && (
            <p className="italic text-yellow-400 text-xl mt-2">
              {movie.tagline}
            </p>
          )}
          <p className="text-sm max-w-2xl mt-4 text-white">{movie.overview}</p>
        </div>
      </div>

      {/* 상세 정보 */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white text-black p-6 rounded-lg shadow-md mt-[-1rem]">
          <h2 className="text-2xl font-semibold mb-6">기본 정보</h2>
          <p>
            <strong>장르:</strong>{" "}
            {movie.genres.map((g: Genre) => g.name).join(", ")}
          </p>
          <p>
            <strong>제작 국가:</strong>{" "}
            {movie.production_countries
              .map((c: ProductionCountry) => c.name)
              .join(", ")}
          </p>
          <p>
            <strong>언어:</strong>{" "}
            {movie.spoken_languages
              .map((l: SpokenLanguage) => l.english_name)
              .join(", ")}
          </p>
          <p>
            <strong>예산:</strong> ${movie.budget.toLocaleString()}
          </p>
          <p>
            <strong>수익:</strong> ${movie.revenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* 감독 / 출연 */}
      {credits && (
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-16">
          <h2 className="text-2xl font-semibold mb-6">감독 / 출연</h2>
          <div className="flex flex-wrap gap-6">
            {/* 감독 */}
            {director && (
              <div className="flex flex-col items-center w-24">
                <img
                  src={
                    director.profile_path
                      ? `https://image.tmdb.org/t/p/w185${director.profile_path}`
                      : "/default-profile.png"
                  }
                  alt={director.name}
                  className="w-24 h-24 object-cover rounded-full border border-gray-300"
                />
                <p className="mt-2 text-sm font-semibold text-center">
                  {director.name}
                </p>
                <p className="text-xs text-gray-400 text-center">Director</p>
              </div>
            )}

            {/* 출연진 */}
            {cast.map((actor: CastMember) => (
              <div
                key={actor.cast_id}
                className="flex flex-col items-center w-24"
              >
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : "/default-profile.png"
                  }
                  alt={actor.name}
                  className="w-24 h-24 object-cover rounded-full border border-gray-300"
                />
                <p className="mt-2 text-sm font-semibold text-center">
                  {actor.name}
                </p>
                <p className="text-xs text-gray-400 text-center">
                  {actor.character}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
