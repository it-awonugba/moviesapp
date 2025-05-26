import { z } from "zod";
import { MovieSchema, MovieDetailSchema } from "@/schemas/movie-schemas";

export type TMovie = z.inferType<typeof MovieSchema>;
export type TMovieList = TMovie[];
export type TMovieDetail = z.inferType<typeof MovieDetailSchema>;
