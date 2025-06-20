import { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

interface MovieListProps {
    movies: Movie[];
};

const MovieList = ({ movies } : MovieListProps) => {
    if (movies.length === 0) {
        return (
            <div className="flex items-center h-60">
                <p className="font-bold text-gray-500">검색결과X</p>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    )
};

export default MovieList;
