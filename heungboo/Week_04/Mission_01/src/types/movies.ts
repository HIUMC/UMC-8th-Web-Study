export type BaseMovie = {
  adult: boolean;
  backdrop_path: string;
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

export type Movie = BaseMovie & {
  genre_ids: number[];
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

type Genre = {
  id: number;
  name: string;
};

type ProductionCompanies = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

type ProductionCountres = {
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

export type MovieDetailResponse = BaseMovie & {
  belongs_to_collection: BelongsToCollection;
  budget: number;

  genre: Genre[];

  homepage: string;
  imdb_id: string;
  origin_country: string[];
  poster_path: string;
  production_companies: ProductionCompanies[];
  production_countries: ProductionCountres[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguages[];
  status: string;
  tagline: string;
};
