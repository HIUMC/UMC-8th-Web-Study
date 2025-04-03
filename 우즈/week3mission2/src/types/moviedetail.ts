export type Genre = {
  id: number;
  name: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type MovieDetail = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  poster_path: string | null;
  backdrop_path: string | null;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  adult: boolean;
  original_language: string;
  genres: Genre[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  imdb_id: string;
  homepage: string;
};
