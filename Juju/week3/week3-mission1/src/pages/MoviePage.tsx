import { useEffect, useState } from "react";
import axios from "axios";
import { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";

export default function MoviePage() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() : void => {
        const fetchMovies = async () : Promise<void> => {
            // 아래 'response'를 { data }로 풀어서 작성해도 된다.
            // { data }로 작성하고 브라우저 콘솔창에서 보면 : 불러온 데이터가 바로 뜬다.
            const { data } = await axios.get<MovieResponse>(
                "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
                {
                    headers: {
                        Authorization: 'Bearer ${import.meta.env.VITE_TMDB_KEY}', // API 키 추가
                        "Content-Type": "application/json",
                    },
                }
            );

            setMovies(data.results);
            // fetch 사용할 때, 실질적인 데이터 값들:
            // await한 후 response.json(); 으로 풀어주는 작업이 필요함.
            // const result = await response.json();

        };

        fetchMovies();
    }, []);

    return (
        <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
            {movies && movies.map((movie) : React.ReactElement => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}