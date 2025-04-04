export interface MovieDetail {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    genres: { id: number; name: string }[];
  }
  
  export interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string;
  }
  