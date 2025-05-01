import { JSX } from "react";
import { MovieCreditResponse, MovieDetailResponse } from "../types/movie";

interface MovieDetailProps {
    movie: MovieDetailResponse;
    credits: MovieCreditResponse
}

export default function MovieDetail({movie, credits}: MovieDetailProps): JSX.Element {
    return (
        <div className="p-6 bg-black text-white min-h-screen">
            {/*영화정보카드*/}
            <div
                className="relative w-full h-[300px] sm:h-[300px] text-white flex items-end rounded-xl overflow-hidden shadow-lg"
                style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                }}
            >
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />

            <div className="relative z-10 p-6 max-w-[50%]">
                <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                <div className="text-sm text-gray-300 mb-1">
                    <div>평균 {movie.vote_average.toFixed(1)}</div>
                    <div>{movie.release_date.slice(0, 4)}</div>
                    <div>{movie.runtime}분</div>
                </div>
                <div className="text-xl italic mb-3">{movie.tagline}</div>
                <p className="text-sm text-gray-200 line-clamp-5">{movie.overview}</p>
            </div>
            </div>


            {/*크레딧 섹션*/}
            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-6"> 감독/출연</h2>
                
                {credits && credits.cast.length > 0 && (
                    <div className="grid grid-cols-10 grid-rows-2 gap-6">
                        {credits.cast.slice(0, 10 * 2).map((person) => (
                        <div
                            key={person.id}
                            className="flex flex-col items-center w-24 text-center"
                        >
                        {/*프로필 이미지*/}
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-700 mb-2 border-2 border-white">
                            {person.profile_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                                alt={person.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                No image
                            </div>
                            )}
                        </div>

                        {/*이름*/}
                        <div className="text-sm font-semibold truncate w-full">{person.name}</div>

                        {/*역할*/}
                        <div className="text-xs text-gray-400 truncate w-full">{person.character}</div>
                    </div>
                ))}
            </div>
            )}    
            </div> 
        </div>
    );
}