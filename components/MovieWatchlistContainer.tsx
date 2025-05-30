import { ReactNode } from "react";
import { Heart, HeartMinus } from "lucide-react";
import { Button } from "./ui/button";
import { useWatchlist } from "@/hooks/use-watchlist";

interface MovieWatchlistContainerProps {
  movieId: number;
  children?: ReactNode;
}

export default function MovieWatchlistContainer({
  movieId,
  children,
}: MovieWatchlistContainerProps) {
  const { isInWatchlist, addMovieToWatchlist, removeMovieFromWatchlist } =
    useWatchlist();
  const handleButtonClick = async () => {
    if (!isInWatchlist(movieId)) {
      await addMovieToWatchlist(movieId);
    } else {
      await removeMovieFromWatchlist(movieId);
    }
  };

  return (
    <div className="relative group/container">
      <Button
        variant="outline"
        size="icon"
        className="absolute top-2 right-2 z-10 opacity-0 group-hover/container:opacity-100 transition-opacity"
        onClick={handleButtonClick}
      >
        {isInWatchlist(movieId) ? (
          <HeartMinus />
        ) : (
          <Heart className="h-5 w-5 text-gray-500 hover:text-red-500 transition-colors" />
        )}
      </Button>
      {children}
    </div>
  );
}
