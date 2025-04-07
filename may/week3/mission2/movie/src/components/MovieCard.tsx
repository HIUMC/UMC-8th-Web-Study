import { useState } from 'react';
import { ReactElement } from 'react';
import { Movie } from '../types/movie';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps{
  movie:Movie;
}

export default function MovieCard({movie}:MovieCardProps):ReactElement{
  const[isHovered, setIsHovered]=useState(false);
  const navigate= useNavigate();

  return (
  <div 
    onClick={():void| Promise<void> =>navigate (`/movie/${movie.id}`)}
    className='relative rounded-xl shadow-lg overflow-hidden cursor-pointer
    w-44 transition-transform duration-500 hover:scale-105' 
    onMouseEnter={():void=>setIsHovered(true)}
    onMouseLeave={():void=>setIsHovered(false)}
  >
    <img 
      src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
    alt={`${movie.title}영화의 이미지`}
    className=''
    />
    {isHovered&& (
      <div className='absolute inset-0 bg-gradient-to-t from-black/50 
      to-transparent backdrop-blur-md flex flex-col justify-center
      items-center text-white p-2'>
        <h2 className='text-lg font-bold leading-snug'>{movie.title}</h2>
        <p className='text-xs text-gray-300 leading-tight mt-2line-clamp-2'>
          {movie.overview}
          </p>
      </div>
    )}
  </div>
  );
}