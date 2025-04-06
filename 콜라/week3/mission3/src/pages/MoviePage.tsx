import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Movie } from "../types/movie";
import axios from "axios";
import { CreditResponse, CastMember, CrewMember } from "../types/credit";
import { LoadingSpinner } from "../components/LoadingSpinner";

interface MovieData {
  movie: Movie | null;
  cast: CastMember[];
  director: CrewMember | null;
}

export const MoviePage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [data, setData] = useState<MovieData>({
    movie: null,
    cast: [],
    director: null,
  });
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!movieId) return;

      setIsPending(true);
      setIsError(false);

      try {
        const [movieResponse, creditsResponse] = await Promise.all([
          axios.get<Movie>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
          axios.get<CreditResponse>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
        ]);

        const director =
          creditsResponse.data.crew.find(
            (person) => person.job === "Director"
          ) || null;

        setData({
          movie: movieResponse.data,
          cast: creditsResponse.data.cast,
          director,
        });
      } catch (error) {
        setIsError(true);
        console.error("Error fetching movie data:", error);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [movieId]);

  if (isError) {
    return (
      <div className="flex justify-center items-center h-dvh">
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  const { movie, cast, director } = data;

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-dvh">
        <span className="text-red-500 text-2xl">
          영화 정보를 찾을 수 없습니다.
        </span>
      </div>
    );
  }

  return (
    <div className="p-5 bg-black">
      <div className="relative w-full h-100">
        <img
          className="w-full h-full object-cover rounded-xl"
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
          alt={movie.title}
        ></img>
        <div className="absolute inset-0 w-120 text-white bg-gradient-to-r from-black via-black/90 to-transparent flex flex-col gap-y-2 rounded-xl">
          <h2 className="text-3xl font-bold">{movie.title}</h2>
          <span className="block">
            <p>평균 {movie.vote_average.toFixed(1)}</p>
            <p>{movie.release_date.slice(0, 4)}</p>
            <p>{movie.runtime}분</p>
          </span>
          <p className="italic text-xl">{movie.tagline}</p>
          <p className="h-full text-sm border-b-1 border-white">
            {movie.overview}
          </p>
        </div>
      </div>
      <div className="bg-black">
        <h2 className="text-3xl font-bold text-white pt-5 pb-10">감독/출연</h2>
        <div className="flex flex-wrap gap-x-10">
          {director && (
            <div className="w-25 h-50 flex flex-col justify-start items-center gap-y-1">
              {director.profile_path ? (
                <img
                  className="size-25 rounded-full border-2 border-white"
                  src={`https://image.tmdb.org/t/p/w500/${director.profile_path}`}
                  alt={director.name}
                ></img>
              ) : (
                <div className="size-25 bg-black rounded-full border-2 border-white" />
              )}
              <p className="text-sm text-center text-white">{director.name}</p>
              <p className="text-sm text-center text-gray-400">
                {director.job}
              </p>
            </div>
          )}
          {cast.map((castMember) => (
            <div
              key={castMember.id}
              className="w-25 h-50 flex flex-col justify-start items-center gap-y-1"
            >
              {castMember.profile_path ? (
                <img
                  className="size-25 rounded-full border-2 border-white"
                  src={`https://image.tmdb.org/t/p/w500/${castMember.profile_path}`}
                  alt={castMember.name}
                ></img>
              ) : (
                <div className="size-25 bg-black rounded-full border-2 border-white" />
              )}
              <p className="text-sm text-center text-white">
                {castMember.name}
              </p>
              <p className="text-sm text-center text-gray-400">
                {castMember.character}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
