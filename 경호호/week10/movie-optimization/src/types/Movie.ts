export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  overview: string;
  release_date: string;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  backdrop_path: string | null;
  video: boolean;
  vote_count: number;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieFilterType {
  query: string;
  include_adult: boolean;
  language: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetail extends Movie {
  genres: Genre[];
  runtime: number;
  budget: number;
  revenue: number;
  tagline?: string;
  homepage?: string;
  imdb_id?: string;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  spoken_languages: Array<{
    iso_639_1: string;
    name: string;
  }>;
} 