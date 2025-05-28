import { z } from "zod";
export const FormSchema = z.object({
  search: z.string().min(3, "Search query is required"),
});
