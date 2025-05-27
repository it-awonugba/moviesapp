import { Input } from "../ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
export default function SearchBar() {
  const formSchema = z.object({
    query: z.string().min(10, "Search query is required"),
  });

  const form = useForm({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  return (
    <Controller
      control={form.control}
      name="query"
      render={({ field }) => (
        <Form {...form}>
          <FormItem>
            <FormLabel>Search</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Search for movies..."
                className="w-full"
              />
            </FormControl>
          </FormItem>
        </Form>
      )}
    />
  );
}
