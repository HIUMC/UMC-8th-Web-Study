// useParams: URL의 파라미터를 가져오기 위한 훅
import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";

import axios from "axios";

// movies.tsx
const MoviesPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    console.log(movies);

    useEffect(() => {
        const fetchMovies = async () => {
            // 응답에 대한 타입을 정의.
            const { data } = await axios.get<MovieResponse>(
                "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
                {
                    headers: {
                        // Bearer + 내 액세스 토큰값 입력.
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTQyZGQwY2VhOTViMmU2ZjRmZmM0ZDgzNjYyNzhmNSIsIm5iZiI6MTc0MzI2NDE0MS4zOCwic3ViIjoiNjdlODE5OGQ1ZjkzYTlmZDI1ZGRhZTgzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.VUiFDF-B_76pG2iJpX2ighL3DNl7STL8Bgtum6pgcno`,
                    },
                }
            );

            setMovies(data.results);
        };

        fetchMovies();
    }, []); // 빈 배열을 넣어주면 컴포넌트가 처음 마운트될 때만 실행됨. 빈 배열을 넣어주지 않으면 무한루프에 빠짐

    return (
        <>
            <h1>영화 데이터 불러오자</h1>
        </>
    );
};

export default MoviesPage;