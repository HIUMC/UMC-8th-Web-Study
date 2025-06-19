import React from 'react';
import type { Movie } from '../types/movie';
import MovieCard from './MovieCard';

interface MovieListProps {
    movies: Movie[];
}

const MovieList = ({movies}: MovieListProps) : React.ReactElement | undefined => {
    if (movies.length === 0) {
        return <div className="flex h-60 items-center justify-center">
                <p className="font-bold text-gray-500">검색 결과가 없습니다.</p>
            </div>;
    }

    return <div className="grid grid-cols-1 gap-6 sm:grip-cols-2 md:grid-cols-3">
        {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
        ))}
    </div>
};

export default MovieList;
