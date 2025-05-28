import { ReactNode } from "react";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";

interface MovieWatchlistContainerProps {
  movieId: number;
  children?: ReactNode;
}

export default function MovieWatchlistContainer({
  movieId,
  children,
}: MovieWatchlistContainerProps) {
  return (
    <div className="relative group/container">
      <Button
        variant="outline"
        size="icon"
        className="absolute top-2 right-2 z-10 opacity-0 group-hover/container:opacity-100 transition-opacity"
      >
        <Heart className="h-5 w-5 text-gray-500 hover:text-red-500 transition-colors" />
      </Button>
      {children}
    </div>
  );
}
