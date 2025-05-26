import { z } from "zod";

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  release_date: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  vote_average: z.number(),
  vote_count: z.number(),
  popularity: z.number(),
});

export const MovieDetailSchema = MovieSchema.extend({
  genre_ids: z.array(z.number()),
  tagline: z.string().optional(),
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  runtime: z.number().optional(),
  spoken_languages: z.array(
    z.object({
      iso_639_1: z.string(),
      name: z.string(),
    })
  ),
});
