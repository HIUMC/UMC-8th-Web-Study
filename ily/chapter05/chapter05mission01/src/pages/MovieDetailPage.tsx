import { useParams } from "react-router-dom";
import { MovieDetail } from "../types/movie";
import LoadingSpinner from "../components/LoadingSpinner";
import useCustomFetch from "../hooks/useCustomFetch";
import useGetDetail from "../hooks/useGetDetail";

export default function MovieDetailPage() {
  const params = useParams();
  const { id } = params;
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const {
    data: movie,
    isPending,
    isError,
  } = useCustomFetch<MovieDetail>(url, "ko-KR");
  const { credits, isBackdrop } = useGetDetail();

  console.log(movie);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <div>
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <>
          <div>
            <div className="items-center flex flex-col justify-center w-full h-full p-10 ">
              <img
                src={
                  movie?.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie?.poster_path}`
                    : ""
                }
                alt={
                  movie?.title
                    ? `${movie?.title} 영화의 이미지`
                    : "영화 이미지 없음"
                }
              />
              <div className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/original${isBackdrop}`}
                  className="absolute inset-0 w-full h-full object-cover blur-sm brightness-50"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center z-10  p-6">
              <h1>{movie?.title}</h1>
              <h2>{movie?.vote_average}</h2>
              <h3>{movie?.overview}</h3>
            </div>
          </div>

          <div
            className="size-100 w-full p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4
          lg:grid-cols-5 xl:grid-cols-10 text-xs"
          >
            {credits?.map((cast) => (
              <div key={cast.id}>
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                    alt={cast.name}
                  />

                  <h4>
                    {cast.known_for_department}/ {cast.name}
                  </h4>
                  <p>{cast.character}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
