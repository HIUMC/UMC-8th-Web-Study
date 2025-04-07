export type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export type MovieResponse = {
    page: number;
    results: []; 
    totalPages:number;
    total_results: number;
};

export interface MovieDetail {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    poster_path: string;
    backdrop_path: string;
  }
  
  export interface Cast {
    cast_id: number;
    character: string;
    name: string;
    profile_path: string;
  }
  
  export interface Crew {
    job: string;
    name: string;
  }
  
  export interface CreditResponse {
    cast: Cast[];
    crew: Crew[];
  }
  
