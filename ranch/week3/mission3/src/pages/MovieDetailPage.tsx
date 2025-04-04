import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "../types/movie";
import { CreditsResponse } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<CreditsResponse | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovieAndCredits = async () => {
      try {
        setIsPending(true);
        const [movieRes, creditsRes] = await Promise.all([
          axios.get<Movie>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
          axios.get<CreditsResponse>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
        ]);
        setMovie(movieRes.data);
        setCredits(creditsRes.data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovieAndCredits();
  }, [movieId]);

  if (isPending)
    return (
      <div className="flex justify-center items-center h-screen bg-[#F0F4F8]">
        <LoadingSpinner />
      </div>
    );
  if (isError || !movie)
    return (
      <div className="text-[#2D6A4F] text-center mt-10 text-lg font-semibold">
        에러가 발생했습니다.
      </div>
    );

  const director = credits?.crew.find((member) => member.job === "Director");
  const topCasts = credits?.cast.slice(0, 5);

  return (
    <div className="p-6 max-w-5xl mx-auto text-[#102A43] bg-[#F0F4F8] rounded-lg shadow-lg">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex justify-center md:justify-start">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="rounded-xl shadow-lg w-full max-w-[200px] aspect-auto object-cover border border-transparent"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold mb-4 text-[#2D6A4F]">
              {movie.title}
            </h1>
            <p className="text-[#334E68] text-sm mb-4">
              개봉일: {new Date(movie.release_date).toLocaleDateString()}
            </p>
            <p className="text-lg leading-relaxed mb-6">{movie.overview}</p>

            {director && (
              <p className="text-md font-medium mb-4">
                🎬 <span className="text-[#334E68]">감독:</span>{" "}
                <span className="font-normal">{director.name}</span>
              </p>
            )}
          </div>
        </div>
        {topCasts && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-[#1E3A5F]">
              👥 주요 출연진
            </h2>
            <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {topCasts.map((cast) => (
                <li
                  key={cast.id}
                  className="text-center flex flex-col items-center"
                >
                  <img
                    src={
                      cast.profile_path
                        ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
                        : "/default-profile.png"
                    }
                    alt={cast.name}
                    className="rounded-lg w-full max-w-[100px] aspect-[2/3] object-cover mb-2 shadow-sm"
                  />
                  <p className="font-bold text-sm text-[#102A43]">
                    {cast.name}
                  </p>
                  {cast.character && (
                    <p className="text-[#334E68] text-xs">({cast.character})</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
