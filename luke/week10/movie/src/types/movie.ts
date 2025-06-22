export type Movie ={
  adult : boolean;
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

export type SearchResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export type SearchQueryParams = {
  query: string;
  includeAdult: boolean;
  language: string;
  page?: number;
}


export type MovieResponse = {
  page: number;
  results: Movie[]
  total_pages: number;
  total_results: number;
};


export type CreditsResponse = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};


export type Cast = {
  id: number;
  name: string;
  original_name: string; 
  profile_path: string;
  character: string;
};

export type Crew = {
  id: number;
  name : string;
  job: string;
  profile_path: string;
};

export type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genres: Genre[];
  runtime: number;
  tagline: string;
};


export type Genre = {
  id: number;
  name: string;
};