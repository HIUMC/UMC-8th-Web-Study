import { useSearch } from "../context/SearchContext";
import useFetch from "../hooks/useFetch";
import type { movieResponse } from "../types/Movie";
import MovieCard from "./MovieCard";


function MoviePage () {
    const {searchTitle, adultContent, language} = useSearch();

 const {data, error, loading} = useFetch<movieResponse>('/search/movie', {
    params: {
        query: searchTitle,
        include_adult: adultContent,
        language: language,
    }
 })
 
 
 return (
    <>
        <div className="flex flex-col items-center justify-center w-full bg-gray-100 rounded-lg shadow-md p-4">
            <h1 className="font-bold text-xl mb-4">🎬 영화 카드</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error.message}</p>}
            {data && (
                <div className="grid grid-cols-3 items-center justify-center gap-4 w-full">
                    {data.results.map((movie => (
                        <MovieCard key={movie.id} {...movie}/>
                    )))}

                </div>
            )}
        </div>
    </>
 )

}

export default MoviePage;