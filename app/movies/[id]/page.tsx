import { getMovieDetails, getMovies } from "@/actions/movies";
import LazyImage from "@/components/LazyImage";
import { formatDate } from "@/lib/dateFormatter";
import { generateImagePath } from "@/lib/generateImagePath";
import { StarIcon } from "lucide-react";

import { Metadata } from "next";
import { getImageProps } from "next/image";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const revalidate = 60;

export const generateStaticParams = async () => {
  const movies = await getMovies(1);
  return movies.map((movie) => ({
    id: movie.id.toString(),
  }));
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;

  const movieDetails = await getMovieDetails(Number(id));

  return {
    title: movieDetails.title,
    description: movieDetails.overview || "No description available",
    openGraph: {
      images: [
        {
          url: generateImagePath(movieDetails.poster_path, 500),
          width: 500,
          height: 750,
          alt: movieDetails.title,
        },
      ],
    },
  };
};

export default async function MovieDetailsPage({ params }: Props) {
  const { id } = await params;
  const movieDetails = await getMovieDetails(Number(id));
  const backgroundImageSrc = getImageProps({
    src: generateImagePath(movieDetails.backdrop_path, 1280),
    width: 1280,
    height: 700,
    quality: 75,
    alt: movieDetails.title,
  }).props.src;

  console.log(movieDetails);
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `${
          backgroundImageSrc
            ? `linear-gradient(#000000bb, #000000bb), url(${backgroundImageSrc})`
            : "none"
        }`,
      }}
    >
      <div className="px-8 py-4 flex flex-col md:flex-row md:px-20 md:py-8 gap-8">
        <div className="w-full max-w-[150px] max-md:mx-auto md:max-w-[200px]">
          <LazyImage
            src={generateImagePath(movieDetails.poster_path, 200)}
            width={200}
            height={300}
            alt={movieDetails.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full w-2/3  space-y-4">
          <h1 className="text-2xl text-white">{movieDetails.title}</h1>
          <div className="flex items-center gap-2">
            <span className="flex gap-2 items-center">
              <StarIcon className="h-4 w-4" fill="yellow" color="yellow" />
              <span className="text-sm text-white">
                {movieDetails.vote_average.toFixed(1)}
              </span>
            </span>
            <span className="size-1 rounded-full bg-gray-500"></span>
            <span className="text-sm text-white">
              {movieDetails.vote_count} votes
            </span>
            <span className="size-1 rounded-full bg-gray-500"></span>
            <span className="text-sm text-white">
              {formatDate(movieDetails.release_date)}
            </span>
          </div>
          <div className="flex gap-2">
            {movieDetails.genres.map((genre: { id: string; name: string }) => (
              <span
                key={genre.id}
                className="text-sm text-white bg-red-700/20 px-2 py-1 rounded"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p className="text-white text-sm font-bold">{movieDetails.tagline}</p>
          <h3 className="text-xs text-white font-semibold uppercase mb-1">
            Overview
          </h3>
          <p className="text-white text-base">{movieDetails.overview}</p>
        </div>
      </div>
    </section>
  );
}
