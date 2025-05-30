"use client";

import { useState, useEffect } from "react";
import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from "@/actions/watchlist";

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<number[]>([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const list = await getWatchlist();
      setWatchlist(list);
    };

    fetchWatchlist();
  }, []);

  const isInWatchlist = (movieId: number) => {
    return watchlist.includes(movieId);
  };

  const addMovieToWatchlist = async (movieId: number) => {
    await addToWatchlist(movieId);
    setWatchlist((prev) => [...prev, movieId]);
  };

  const removeMovieFromWatchlist = async (movieId: number) => {
    await removeFromWatchlist(movieId);
    setWatchlist((prev) => prev.filter((id) => id !== movieId));
  };

  return {
    watchlist,
    isInWatchlist,
    addMovieToWatchlist,
    removeMovieFromWatchlist,
  };
};
