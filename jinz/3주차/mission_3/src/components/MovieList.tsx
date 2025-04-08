import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { Movie } from "../types/movie";

interface MovieListProps {
    category: string; 
    title: string;
    movie: Movie;

  }


const MovieList: React.FC<MovieListProps>=({category, title})=>{
    const [movies, setMovies]=useState<Movie[]>([])
    const [isLoading, setIsLodading]=useState<boolean>(true);
    const[currentPage, setCurrentPage]=useState(1);
    const [totalPages, setTotalPages]=useState(1);
    
    useEffect(():void=>{

        const fetchMovies = async () : Promise<void> =>{

            setIsLodading(true);

            const {data}= await axios.get(
                `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${currentPage}`,
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    }
                }
            );
            setMovies(data.results);   
            setTotalPages((Math.ceil(data.total_results/10)));
            setIsLodading(false);
        }  
        fetchMovies();
 
    }, [category, currentPage]);

    useEffect(()=>{
        setCurrentPage(1);
    },[category])



    return ( 
        <div>
            <h1> {title} </h1>
            {isLoading? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500">
                        로딩 ㅋㅋ 중ㅋㅋ
                    </div>
                </div>
            ):movies.length > 0 ? (<div>
                <div className='flex w-full items-center justify-center gap-4 text-center mt-4'>
                    <button className="Button" 
                    disabled={currentPage===1}>◀</button>
                    <p>{currentPage}페이지</p>
                    <button className="Button" 
                    onClick={()=>{setCurrentPage((prev)=>Math.min(prev +1, totalPages))
                    }} 
                    disabled={currentPage===totalPages}>▶</button>

                </div>
                <div className='p-10 grid gap-4 grid-cols-5'>
                 {movies.map((movie)=>
                     (<MovieCard key={movie.id} movie={movie} category={category}/>))}
                </div>
            </div>
                
            ):(
            <p className="text-center text-large font-bold ">영화데이터가 없습니다.</p> 
            )}
            
        </div>
        
    );
};

export default MovieList;

