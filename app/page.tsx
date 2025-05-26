import { getMovies } from "@/actions/movies";
import MovieCard from "@/components/MovieCard";

export default async function Home() {
  const movies = await getMovies(1);
  if (!movies || movies.length === 0) {
    return <p className="text-center text-gray-500">No movies found.</p>;
  }

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 w-full">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}
