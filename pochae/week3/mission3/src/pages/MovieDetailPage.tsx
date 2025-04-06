import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieCreditResponse, MovieDetailResponse } from "../types/movie";
import axios from "axios";
import MovieDetail from "../components/MovieDetail";


const MovieDetailPage = () => {
  const params = useParams();
  const [credits, setCredits] = useState<MovieCreditResponse>();

  const [movie, setMovie] = useState<MovieDetailResponse>();
  // 1. 로딩 상태
  const [ isPending, setIsPending ] = useState(false);
  // 2. 에러 상태
  const [ isError, setIsError ] = useState(false);

  useEffect((): void => {
    const fetchMovies = async(): Promise<void> => {
        setIsPending(true);

        try{
            const {data: detailData } = await axios.get<MovieDetailResponse>(
              `https://api.themoviedb.org/3/movie/${params.movieId}?language=ko-KR`,
              {
                headers : {
                Authorization : `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                },
              }
            );

            const {data: creditData} = await axios.get<MovieCreditResponse>(
              `https://api.themoviedb.org/3/movie/${params.movieId}/credits?language=ko-KR`,
              {
                headers : {
                Authorization : `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                },
              }
            );
    
            setMovie(detailData);
            setCredits(creditData);

        } catch {
            setIsError(true);
        } finally {
            setIsPending(false);
          }
        };

        fetchMovies();
    }, [params.movieId]);  

    if(isPending) {
      return <div>Loading...</div>
    }

    if(isError){
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
