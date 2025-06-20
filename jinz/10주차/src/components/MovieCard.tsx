import React, { useState } from "react";
import type { Movie } from "../types/Movie";
import MovieModal from "./MovieModal";

function MovieCard (movie:Movie) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const handleModalOpen = () => {
        setModalOpen(true);
    }
    const handleModalClose = () => {
        setModalOpen(false);
    }

    return (
    
    <>
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 w-full max-w-md text-sm">
            <div className="relative">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title} 
                    className="w-full h-auto rounded-lg mt-2"
                    onClick={handleModalOpen} />
                <p className="absolute top-4 right-2 bg-gray-600 text-white px-2 py-1 rounded">
                {movie.vote_average}</p>
            </div>
            <div className="flex flex-col items-center justify-between mt-2">
                <h2 className="font-bold text-lg">{movie.title}</h2>
                <p className="text-gray-400">{movie.release_date}</p>
                <p className="line-clamp-3">{movie.overview}</p>
            </div>
        </div>

        {modalOpen &&(
            <MovieModal
                movie={movie} onClose={handleModalClose}/>

        )}
    </>
        
    )
}

export default React.memo(MovieCard);