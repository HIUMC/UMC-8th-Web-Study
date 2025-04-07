import axios from "axios";
import { JSX, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// 타입도 깔끔하게!
import { MovieDetail, CreditResponse, Cast, Crew } from "../types/movie";


const MovieDetailPage = (): JSX.Element => {
  const { movieId } = useParams<{ movieId: string }>();

  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<CreditResponse | null>(null);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsPending(true);
      try {
        // 영화 상세
        const movieResponse = await axios.get<MovieDetail>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovieDetail(movieResponse.data);

        // 감독 및 출연진 정보
        const creditResponse = await axios.get<CreditResponse>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setCredits(creditResponse.data);

      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (isPending || !movieDetail || !credits) {
    return <div>로딩 중...</div>;
  }

  const director = credits.crew.find((crew: Crew) => crew.job === "Director");
  const castList = credits.cast.slice(0, 10); // 출연진 10명까지 보여주기

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">{movieDetail.title}</h1>
      <p className="mb-2">{movieDetail.overview}</p>
      <p className="mb-2">평점: {movieDetail.vote_average}</p>
      <p className="mb-4">개봉일: {movieDetail.release_date}</p>

      {director && (
        <p className="mb-4">
          <strong>감독:</strong> {director.name}
        </p>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-2">출연진</h2>
        <div className="flex flex-wrap gap-4">
          {castList.map((cast: Cast) => (
            <div key={cast.cast_id} className="w-32 text-center">
              <img
                src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                alt={cast.name}
                className="rounded-lg mb-1"
              />
              <p className="text-sm">{cast.name}</p>
              <p className="text-xs text-gray-500">{cast.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
