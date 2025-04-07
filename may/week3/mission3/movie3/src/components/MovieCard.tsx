import { useState } from "react";
import { Movie } from "../types/movie";


interface MovieCardProps {
    movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="relative h-full rounded-xl overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover aspect-[2/3]"
            />
            {isHovered ? (
                <div className="absolute inset-0 bg-black/70 p-4 flex flex-col justify-center items-center text-white transition-opacity duration-200">
                    <h2 className="text-lg font-bold text-center mb-2">{movie.title}</h2>
                    <p className="text-sm text-center line-clamp-6 overflow-hidden">
                        {movie.overview || "설명이 없습니다."}
                    </p>
                    <p className="text-sm mt-2 text-gray-300">
                        {new Date(movie.release_date).getFullYear()}
                    </p>
                </div>
            ) : (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <h2 className="text-white font-semibold text-lg">{movie.title}</h2>
                    <p className="text-gray-300 text-sm">
                        {new Date(movie.release_date).getFullYear()}
                    </p>
                </div>
            )}
        </div>
    );
};

export default MovieCard;