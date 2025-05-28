"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { TMovieList } from "@/types";

import { searchMovies } from "@/actions/movies";
import MovieCard from "@/components/MovieCard";

export default function SearchResultPage() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(0);
  const [movies, setMovies] = useState<TMovieList>([]);
  const { ref, inView } = useInView();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (query && page > 0) {
      searchMovies(query, page).then((data) => {
        setMovies((prev) => [...prev, ...data]);
      });
    }
  }, [query, page]);

  useEffect(() => {
    if (inView && query) {
      setPage((prev) => prev + 1);
    }
  }, [inView, query]);

  if (!query) {
    return (
      <div className="text-center text-gray-500">
        Please enter a search query.
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No movies found for {query}.
      </div>
    );
  }
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 w-full">
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
      <div ref={ref} className="invisible h-0" />
    </section>
  );
}
