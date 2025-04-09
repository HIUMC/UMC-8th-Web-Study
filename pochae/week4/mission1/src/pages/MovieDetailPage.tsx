import { useParams } from "react-router-dom";
import { MovieCreditResponse, MovieDetailResponse } from "../types/movie";
import MovieDetail from "../components/MovieDetail";
import useCustomFetch from "../hooks/useCustomFetch";


const MovieDetailPage = () => {
  const params = useParams();

  const url1 = `https://api.themoviedb.org/3/movie/${params.movieId}?language=ko-KR`;
  const url2 = `https://api.themoviedb.org/3/movie/${params.movieId}/credits?language=ko-KR`;

  
  const {isPending: isPending1, isError: isError1, data: movie} = useCustomFetch<MovieDetailResponse>(url1, "ko-KR");
  const {isPending: isPending2, isError: isError2, data: credits} = useCustomFetch<MovieCreditResponse>(url2);

  if(isPending1 || isPending2) {
    return <div>Loading...</div>
  }

  if(isError1 || isError2) {
      return (
        <div>
          <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span>
        </div>
      );
  }

  return (
    <div>
      {movie && credits && <MovieDetail movie={movie} credits={credits}/>}
    </div>
  )
};

export default MovieDetailPage;
