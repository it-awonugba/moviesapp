"use client";

import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { debounceSearchForm } from "@/lib/debounce-search";
import { FormSchema } from "@/schemas/form-schema";
import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";

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
      <div className="relative max-w-md">
        <Input
          {...form.register("search")}
          type="text"
          placeholder="Search for movies..."
          className={cn(
            "w-full pr-12 outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-blue-500",
            {
              "focus-visible:ring-red-500":
                form.formState.errors.search?.message,
            }
          )}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute top-0 z-10 right-0 cursor-pointer bg-transparent shadow-none hover:bg-transparent dark:hover:bg-transparent"
        >
          <SearchIcon color="black" />
        </Button>
      </div>
    </form>
  );
}
