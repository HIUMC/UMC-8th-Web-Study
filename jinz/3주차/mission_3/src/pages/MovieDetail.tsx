import { useState, useEffect } from "react";
import { Movie } from "../types/movie";
import { useParams } from "react-router-dom";
import axios from "axios";


export function MovieDetail(){
    const {id}=useParams();
    const [movie, setMovies]=useState<Movie | null>(null);
    const [cast, setCast]=useState<any[]>([]);


    useEffect(()=>{
        const fetchMovie = async () => {
            const movieData = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
                {
                  headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                  },
                }
              );

            const creditData = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
                {
                    headers: {
                      Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    },
                  }
            )

            setMovies(movieData.data);
            setCast(creditData.data.cast);
            
        }
        if (id) fetchMovie();
    }, [id])

    if (!movie) return <div className="p-4 text-black">로딩 중...</div>;




return (
        <div className="p-4 text-black max-w-screen-md mx-auto">
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} 포스터`}
                className="rounded-lg mb-4"
                
            />            

            <p className="text-black leading-relaxed">{movie.overview}</p>
            <p className="mt-4">개봉일: {movie.release_date}</p>
            <p>평점: {`${movie.vote_average}/10`}</p>
            <div>
                <p>출연진</p>
                <div className="grid grid-cols-6 gap-4">
                    {cast.map((actor)=>(
                        <div key={actor.id} className="flex flex-col items-center text-center">
                            {actor.profile_path? (
                                <img src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                    alt={actor.name}
                                    className="w-24 h-24 object-cover rounded-full mb-2"
                                />) : (
                                    <div className="w-24 h-24 object-cover rounded-full mb-2 bg-gray-300">
                                        <span className="text-xs text-gray-600">No Image</span>
                                    </div>
                                )}
                            <p className="text-sm">{actor.name}</p>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )        
}