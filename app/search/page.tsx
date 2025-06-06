import SearchResult from "@/components/SearchResult";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<div className="text-center">Loading results...</div>}>
      <SearchResult />
    </Suspense>
  );
}
