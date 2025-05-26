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
