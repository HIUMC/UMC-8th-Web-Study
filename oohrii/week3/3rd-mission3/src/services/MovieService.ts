// src/services/MovieService.ts
const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovieDetail = async (movieId: string) => {
  const res = await fetch(`${BASE_URL}/movie/${movieId}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch movie detail");
  return res.json();
};

export const fetchCredits = async (movieId: string) => {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/credits`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch credits");
  return res.json();
};
