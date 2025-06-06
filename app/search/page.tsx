import SearchResult from "@/components/SearchResult";
import { Suspense } from "react";

<Suspense fallback={<div className="text-center">Loading results...</div>}>
  <SearchResult />
</Suspense>;
