"use server";

import { getWatchListMovieDetails } from "@/actions/watchlist";
import MovieCard from "@/components/MovieCard";
import MovieWatchlistContainer from "@/components/MovieWatchlistContainer";

export default async function WashlistPage() {
  const watchlistDetails = await getWatchListMovieDetails();
  if (watchlistDetails.length === 0) {
    return (
      <section className="container mx-auto">
        <p className="text-gray-500 text-center">Your watchlist is empty.</p>
      </section>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 w-full h-full">
      {watchlistDetails.map((movie) => (
        <MovieWatchlistContainer key={movie.id} movieId={movie.id}>
          <MovieCard movie={movie} />
        </MovieWatchlistContainer>
      ))}
    </div>
  );
}
