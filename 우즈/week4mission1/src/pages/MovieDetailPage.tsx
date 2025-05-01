import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import { MovieDetailResponse, MovieCredit } from "../types/movie";

const MovieDetailPage = () => {
  const params = useParams();
  const url = `https://api.themoviedb.org/3/movie/${params.movieId}`;

  const {
    isPending,
    isError,
    data: movie,
  } = useCustomFetch<MovieDetailResponse>(url, "ko-KR");

  const creditUrl = `https://api.themoviedb.org/3/movie/${params.movieId}/credits`;
  const { data: credit } = useCustomFetch<MovieCredit>(creditUrl, "ko-KR");

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 배경 이미지 섹션 */}
      <div
        className="relative overflow-hidden mb-8"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent" />

        {/* 텍스트 내용 */}
        <div className="relative z-10 px-12 py-20 text-white">
          <h1 className="text-5xl font-bold">{movie?.title}</h1>
          <p className="text-xl mt-3">
            🌟평균 {movie?.vote_average} · {movie?.release_date.slice(0, 4)}년 ·{" "}
            {movie?.runtime}분
          </p>
          {movie?.tagline && (
            <p className="text-lg italic mt-3 text-yellow-200">
              {movie.tagline}
            </p>
          )}
          <div className="mt-6 text-lg leading-relaxed max-w-4xl">
            <p>{movie?.overview}</p>
          </div>
        </div>
      </div>

      {/* 출연진 섹션 */}
      {credit?.cast && (
        <div className="px-12 pb-12">
          <h2 className="text-3xl font-semibold mb-6 text-black">출연진</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {credit.cast.map((member) => (
              <div key={member.credit_id} className="text-center text-black">
                <img
                  src={
                    member.profile_path
                      ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                      : "/no-profile.png"
                  }
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover"
                />
                <div className="mt-2">
                  <p className="text-sm font-bold text-black">{member.name}</p>
                  <p className="text-xs text-black/80">{member.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default MovieDetailPage;
