import React from 'react';
import type { Movie } from '../types/movie';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard = ({movie}: MovieCardProps) : React.ReactElement => {
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
const fallbackImageImage = 'https://via.placeholder.com/500x750';

    return <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md
    transition-all hover:shadow-lg">
        <div className="relative h-80 overflow-hidden">
            <img src={
                movie.poster_path 
                ? '${imageBaseUrl}${movie.poster_path}' 
                :fallbackImageImage
                } 
                alt={'${movie.title} 포스터'}
                className="h-full w-full object-cover transition-transform
                duration-300 ease-in-out hover:scale-105"
            />
            <div className="absolute right-2 top-2 rounded-md bg-black px-2 py-1
            text-sm font-bold text-white">
                {movie.vote_average.toFixed(1)}
            </div>
        </div>
    </div>
};

export default MovieCard;
