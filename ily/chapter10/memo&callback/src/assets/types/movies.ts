export type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string | null;
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
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type MovieFilterType = {
  query: string;
  include_adult: boolean;
  language: MovieLanguage | string;
};

export type MovieLanguage = {
  language: "ko-KR" | "en-US" | "ja-JP" | "zh-CN" | "zh-TW";
};
