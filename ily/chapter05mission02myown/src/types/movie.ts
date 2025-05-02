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

type production_companies = {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
};
type spoken_languages = {
  english_name: string;
  iso_639_1: string;
  name: string;
};
type Genre = { id: number; name: string };

type BelongsToCollection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};

export type MovieDetail = BaseMovie & {
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  origin_country: string[];
  production_Compoanies: production_companies[];
  revenue: number;
  runtime: number;
  spoken_languages: spoken_languages[];
  status: string;
  tagline: string;
};

type cast = {
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

export type Credit = {
  id: number;
  cast: cast[];
};

type Data = {
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
};

export type ResponseData = {
  status: boolean;
  message: string;
  statusCode: number;
  data: Data;
};
