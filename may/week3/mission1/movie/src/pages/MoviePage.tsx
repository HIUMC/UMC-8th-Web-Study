import { ReactElement, useEffect, useState } from "react";
import {Movie, MovieResponse} from '../types/movie';
import axios from "axios";
import MovieCard from '../components/MovieCard';

 
export default function MoviePage(){
  const [movies, setMovies]=useState<Movie[]>([]);

  useEffect(():void=>{
    const fetchMovies = async () : Promise<void>=>{
      const apiKey = import.meta.env.VITE_TMDB_KEY;
      const { data }  = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/tv/popular?language=en-EN&page=1`,
        {
          headers:{
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      console.log(data);
      console.log(import.meta.env.VITE_TMDB_KEY);
      setMovies(data.results); 
    };
    fetchMovies();
  },[]);

  return (
  <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
  xl:grid-cols-6'>
    {movies&& movies.map((movie):ReactElement=>(
      <MovieCard key={movie.id}movie ={movie}/>
    ))}
  </div>
  );
}