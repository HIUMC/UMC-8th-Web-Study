import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import { Movie } from "../types/movie";

const Popular: React.FC=()=>{
    const [movies, setMovies]=useState<Movie[]>([])

    useEffect(():void=>{
        const fetchMovies = async () : Promise<void> =>{
            const {data}= await axios(
                `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    }
                }
            );

            setMovies(data.results);
        }  
        
        fetchMovies();
    }, []);

    console.log(movies[0]?.adult);

    return (
        <div>
            <h1> 인기 쟁이들...</h1>
            <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg: grid-cols-5 xl: grid-cols-6'>
                {movies.map((movie)=>(
                <MovieCard key={movie.id} movie={movie}/>
        ))}
        </div>
        </div>
        
    );
    
};

export default Popular;