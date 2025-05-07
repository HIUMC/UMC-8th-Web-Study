
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Movie } from "../types/movie";


export function MovieDetail(){
    const {id}=useParams();
    const{data: movie, 
        loading: movieLoading, 
        error:movieError
    }=useFetch<Movie>(`https://api.themoviedb.org/3/movie/${id}?language=en-US`,{
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
    })
    const{data: credit, 
        loading: creditLoading, 
        error: creditError
    }=useFetch<any>(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,{
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
    })
    const cast=credit?.cast || [];

    if (movieLoading || creditLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (movieError || creditError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">에러 발생생</p>
            </div>
        );
    }
    return (
        <div className="p-4 text-black max-w-screen-md mx-auto">
            <h1 className="text-3xl font-bold mb-4">{movie?.title}</h1>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                alt={`${movie?.title} 포스터`}
                className="rounded-lg mb-4"
                
            />            

            <p className="text-black leading-relaxed">{movie?.overview}</p>
            <p className="mt-4">개봉일: {movie?.release_date}</p>
            <p>평점: {`${movie?.vote_average}/10`}</p>
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