import Link from "next/link";
import { MonitorPlayIcon, HeartIcon, MoonIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="container flex flex-row justify-between items-center py-4 px-8 lg:px-20 shadow-xs">
      <Link
        href="/"
        className="flex items-center justify-center border border-black border-3 p-1 rounded-full"
      >
        <MonitorPlayIcon className="w-6 h-6 text-gray-700" />
      </Link>

      <nav className="flex items-center gap-1 sm:gap-4">
        <Button
          asChild
          variant="outline"
          className="max-sm:size-10 cursor-pointer"
        >
          <Link href="/wishlist">
            <HeartIcon
              className="inline-block w-6 h-6"
              fill="red"
              color="red"
            />
            <span className="max-sm:hidden text-sm">Wishlist</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="max-sm:size-10 cursor-pointer"
        >
          <MoonIcon className="inline-block w-6 h-6" />

          <span className="sr-only">Toggle theme</span>
        </Button>
      </nav>
    </header>
  );
}
