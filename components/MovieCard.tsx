import { TMovie } from "@/types";
import Link from "next/link";
import LazyImage from "./LazyImage";
import { generateImagePath } from "@/lib/generateImagePath";

interface MovieCardProps {
  movie: TMovie;
}
export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="group overflow-hidden">
      <Link href={`/movies/${movie.id}`} className="block">
        <div className="relative w-full overflow-hidden rounded-lg">
          <LazyImage
            src={generateImagePath(movie.poster_path, 200)}
            alt={movie.title}
            className="object-cover w-full aspect-[2/3] transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={75}
            width={150}
            height={200}
          />
        </div>
        <h2 className="mt-2 text-sm leading-snug font-semibold">
          {movie.title}
        </h2>
        <p className="text-sm text-gray-600">{movie.release_date}</p>
      </Link>
    </div>
  );
}
