import React, { useState } from 'react';
import type { Movie } from '../types/movie';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';

interface MovieListProps {
    movies: Movie[];
}

const MovieList = ({movies}: MovieListProps): React.ReactElement => {
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleMovieClick = (movie: Movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
    };

    if (movies.length === 0) {
        return (
            <div className="flex h-60 items-center justify-center">
                <p className="font-bold text-gray-500">검색 결과가 없습니다.</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                {movies.map((movie) => (
                    <div 
                        key={movie.id} 
                        className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                        onClick={() => handleMovieClick(movie)}
                    >
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-auto object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 className="text-white font-bold text-lg mb-1">{movie.title}</h3>
                            <div className="flex items-center text-white">
                                <span className="text-yellow-400 mr-1">★</span>
                                <span>{movie.vote_average.toFixed(1)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default MovieList;
