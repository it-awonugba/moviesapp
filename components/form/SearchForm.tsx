"use client";

import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { debounceSearchForm } from "@/lib/debounce-search";
import { FormSchema } from "@/schemas/form-schema";

const defaultValues = {
  search: "",
};

export default function SearchForm() {
  const router = useRouter();

  const form = useForm({
    mode: "all",
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const onSubmit = (data: typeof defaultValues) => {
    router.push(`/search?query=${encodeURIComponent(data.search.trim())}`);
  };

  const debouncedOnSubmit = useCallback(debounceSearchForm(onSubmit, 500), []);

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
