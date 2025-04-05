import { useContext, createContext, PropsWithChildren, useState } from "react";
import { Movie } from "../types/movie";

interface DetailContextType {
  movies: Movie;
}

export const DetailContext = createContext<DetailContextType | undefined>(
  undefined,
);


export const DetailProvider = ({ children }: PropsWithChildren) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  return (

    <DetailContext.Provider value={{ movies, setMovies }}
  )
};



