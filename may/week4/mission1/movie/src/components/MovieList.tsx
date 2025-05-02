import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { Movie } from "../types/movie";
import { useFetch } from "../hooks/useFetch";


interface MovieListProps {
    category: string; 
    title: string;
    movie: Movie;

  }


const MovieList: React.FC<MovieListProps>=({category, title})=>{
    const[currentPage, setCurrentPage]=useState(1);
    const [totalPages, setTotalPages]=useState(1);
    
    const {data,
        loading: movieLoading,
        error:movieError
        }=useFetch<{ results: Movie[]; total_results: number }>(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${currentPage}`,{
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
    });

    useEffect(() => {
        if (data?.total_results) {
            setTotalPages(Math.ceil(data.total_results / 10));
        }
    }, [data]);
        

    useEffect(()=>{
        setCurrentPage(1);
    },[category])

    if (movieLoading){
        return(
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
            </div>
        )
        
    }

    if (movieError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">에러 발생생</p>
            </div>
        );
    }



    return ( 
        <div>
            <h1> {title} </h1>
            {data?.results.length > 0 ? (
                <div>
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
                 {data?.results.map((movie)=>
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