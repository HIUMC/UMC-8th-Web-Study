import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import { MovieFilters, MovieResponse } from "../types/movie";

export default function HomePage() {
    const [ filters, setFilters ] = useState<MovieFilters>({
      query: "avengers",
      include_adult: false,
      language: "en-US",
    });

    const axiosRequestConfig = useMemo(():{params: MovieFilters}=>({
        params: filters, }), [filters],
    ); 

    const { data, error, isLoading } = useFetch<MovieResponse>("/search/movie", axiosRequestConfig);

    const handleMovieFilters = useCallback(
    (filters: MovieFilters): void => {
      setFilters(filters);
    },
    [setFilters]
  );

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container">
            <MovieFilter onChange={handleMovieFilters} />
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <MovieList movies={data?.results || []} />
            )}
        </div>
    );
};