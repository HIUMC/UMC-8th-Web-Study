import { Movie } from "../types/movie"

interface MovieCardProps {
    movie: Movie;  
}

const MovieCard = ({ movie } : MovieCardProps) => {
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    const fallbackImage = "https://via.placeholder.com/640x480";
    
    return (
        <div className="overflow-hidden rounded-lg shadow-md bg-white trainsition-all hover:shadlow-lg">
            <div className="overflow relative hidden h-80">
                <img 
                    src={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : fallbackImage} 
                    alt={`${movie.title} 포스터`}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105" 
                />
                <div className="absolute right-2 top-2 rounded-md bg-black px-2 py-1 text-sm font-bold text-white">
                    {movie.vote_average.toFixed(1)}
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{movie.title}</h3>
                <p className="mt-2 text-sm text-gray-500">개봉일: {movie.release_date}</p>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{movie.overview}</p>
            </div>
        </div>
    )
}

export default MovieCard
