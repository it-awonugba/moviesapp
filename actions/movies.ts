"use server";

import { TMovieList } from "@/types";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

export const getMovies = async (page: number): Promise<TMovieList> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();
  return data.results as Promise<TMovieList>;
};

export const searchMovies = async (
  query: string,
  page: number
): Promise<TMovieList> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(
      query
    )}&page=${page}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  const data = await response.json();
  return data.results as Promise<TMovieList>;
};

export const getMovieDetails = async (id: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return response.json();
};
