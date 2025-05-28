"use client";

import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { debounce } from "@/lib/debounce";

const defaultValues = {
  search: "",
};

export default function SearchForm() {
  const formSchema = z.object({
    search: z.string().min(3, "Search query is required"),
  });
  const router = useRouter();

  const form = useForm({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/search?query=${encodeURIComponent(data.search.trim())}`);
  };

  const debouncedOnSubmit = useCallback(debounce(onSubmit, 500), []);

  return (
    <form
      onSubmit={form.handleSubmit(debouncedOnSubmit)}
      className="flex-1 mx-4"
    >
      <Input
        {...form.register("search")}
        type="text"
        placeholder="Search for movies..."
        className={cn(
          "w-full max-w-md outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-blue-500",
          {
            "focus-visible:ring-red-500": form.formState.errors.search?.message,
          }
        )}
      />
    </form>
  );
}
