import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Movie } from "../types/movie";

interface MovieCardProps{
    category:string;
    movie: Movie;
}
export default function MovieCard({movie, category}:MovieCardProps){
    const[isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movies/${category}/${movie.id}`);
    };

    return (

        
        <div className='relative rounded-xl shadow-lg overflow-hidden cursor-pointer
        w-44 transition-transform duration-300 hover:scale-105'
        onMouseEnter={():void => setIsHovered(true)}
        onMouseLeave={():void => setIsHovered(false)}
        onClick={handleClick}
        >
        

        <div>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={`${movie.title} 영화의 이미지`}
            onClick={() => { handleClick();}} className="cursor-pointer"
            /> 
        </div>

        {isHovered && (
            <div className='absolute inset-0 bg-gradient-to-t from-black/50
            to-transparent backdrop-blur-md flex flex-col justify-center items-center 
            text-white p-4'>
                <h2 className="text-lg font-bold text-center leading-snug">
                    {movie.title}</h2>
                <p className='text-sm text-gray-300 leading-relaxed mt-2 
                line-clamp-5'>{movie.overview}</p>
            </div>
        )}

        
     </div>
)
}