import { z } from "zod";
import { MovieSchema, MovieDetailSchema } from "@/schemas/movie-schemas";
import { FormSchema } from "@/schemas/form-schema";

export type TMovie = z.inferType<typeof MovieSchema>;
export type TMovieList = TMovie[];
export type TMovieDetail = z.inferType<typeof MovieDetailSchema>;
