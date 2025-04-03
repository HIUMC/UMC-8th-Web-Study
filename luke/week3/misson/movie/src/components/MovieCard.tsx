import React from 'react'
import { Movie } from '../types/movie'
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie : Movie;
}

export default function MovieCard({movie}: MovieCardProps) {

  const [isHovered, setisHovered] = React.useState(false)



  return (
    <Link to={`/movie/${movie.id}?language=en-US`}>
      <div 
      className='relative rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105'
      onMouseEnter={() => setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}
      >
      <img 
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt ={movie.title}
      />
      {isHovered && (
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/100 flex flex-col items-center justify-center text-white'>
        <h2 className='text-lg font-bold'>{movie.title}</h2>
        <p className='text-gray-300 leading-relaxed mt-2 line-clamp-3'>{movie.overview}</p>
        </div>    
      )}
      </div>
    </Link>
    
  )
}
