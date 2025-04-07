export type BaseMovie={
  adult:boolean;
  backdrop_path: string;
  id:number;
  original_language:string;
  original_title:string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count:number;
};




export type Movie=BaseMovie &{
  genre_ids:number[];
}

export type MovieResponse={
  page: number;
  results:Movie[];
  total_pages:number;
  total_results:number;

};
type Genre={
  id:number;
  name:string;
  logo_path:string;
  origin_country:string;
}

type ProductionCompany={
  id:number;
  name:string;
  logo_path:string;
  origin_country:string;
}
type ProductionCountries={
  iso_3166_1:string;
  name:string;
}
type SpokenLanguage={
  english_name: string,
  iso_639_1: string,
  name: string
}

type BelongsToCollection={
  id:number;
  name:string;
  poster_path:string;
  backdrop_path:string;
}
export type MovieDetailResponse=BaseMovie&{
  belongs_to_collection:BelongsToCollection;
  budget:number;
  genres:Genre[];
  homepage: string;
  imdb_id: string;
  origin_country: string[];
  production_companies:ProductionCompany[];
  production_countries:ProductionCountries[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
}
export interface Credit {
  id: number;
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }[];
  crew: {
    id: number;
    name: string;
    job: string;
    profile_path: string | null;
  }[];
  }