// MovieDetailPage.tsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MovieDetail } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Credit, CreditsResponse } from "../types/credit";

export default function MovieDetailPage() {
    const { movieId } = useParams<{ movieId: string }>();
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [cast, setCast] = useState<Credit[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);


    useEffect(() => {
        const fetchMovieDetail = async () => {
            setIsLoading(true);
            try {
                const movieRes = await axios.get<MovieDetail>(
                    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                );

                const creditRes = await axios.get<CreditsResponse>(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                );

                setMovie(movieRes.data);
                setCast(creditRes.data.cast);
            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        if (movieId) {
            fetchMovieDetail();
        }
    }, [movieId]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-dvh bg-black">
                <LoadingSpinner />
            </div>
        );
    }

    if (isError || !movie) {
        return (
            <div className="text-center text-red-500 mt-20 text-xl bg-black h-dvh">
                에러가 발생했습니다.
            </div>
        );
    }

    return (
        <div className="bg-black text-white min-h-screen">
            <div
              className="relative h-[450px] bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              }}
            >
              {/* 어두운 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />

              {/* 영화 정보 텍스트 */}
              <div className="absolute bottom-0 left-0 p-8 z-20 text-white max-w-4xl">
                <h1 className="text-4xl font-bold">{movie.title}</h1>
                <p className="text-gray-300 italic text-lg mt-2">{movie.tagline}</p>
                <div className="text-sm text-gray-400 mt-4 space-x-4">
                  <span>⭐ {movie.vote_average.toFixed(1)}</span>
                  <span>📅 {movie.release_date}</span>
                  <span>⏱️ {movie.runtime}분</span>
                </div>
                <p className="mt-4 text-gray-200 max-w-3xl">{movie.overview}</p>
              </div>
            </div>

            {/* 상세 정보 */}
            <div className="max-w-5xl mx-auto p-6">

                {/* 출연진 */}
                {cast.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold mb-4">감독/출연</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {cast.map(actor => (
                                <div key={actor.id} className="flex flex-col items-center text-center">
                                    <img
                                        src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : '/default-profile.png'}
                                        alt={actor.name}
                                        className="w-24 h-24 object-cover rounded-full border border-gray-700"
                                    />
                                    <p className="mt-2 text-sm font-medium">{actor.name}</p>
                                    <p className="text-xs text-gray-400">{actor.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
