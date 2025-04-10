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
}

export type MovieResponse = {
    page: number,
    results: Movie[],
    totalPages: number,
    total_results: number,
};

type Genre = {
    id: number;
    name: string;
};

type ProductionCompany = {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
};

type ProductionCountries = {
    iso_3166_1: string;
    name: string;
};

type SpokenLanguages = {
    english_name: string;
    iso_639_1: string;
    name: string;
};

type BelongsToCollection = {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
};

type BaseMovie = {
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

type Cast = {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
  };
  
  type Crew = {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: string;
    job: string;
  };
  
  export type MovieCreditResponse = {
    id: number;
    cast: Cast[];
    crew: Crew[];
  };
  


export type MovieDetailResponse = BaseMovie & {
    belongs_to_collection : BelongsToCollection;
    budget: number;
    genres: Genre[];
    homepage: string;
    imdb_id: string;
    origin_country: string[];
    production_companies: ProductionCompany[];
    production_countries: ProductionCountries[];
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguages[];
    status: string;
    tagline:string;
};