import Link from "next/link";
import type { ReactNode } from "react";

export function SiteHeader({ right }: { right?: ReactNode }) {
  return (
    <header className="flex items-center justify-between gap-4 px-5 py-4 md:px-8">
      <Link href="/" className="group inline-flex items-center gap-3 text-cream">
        <span className="brass-plate inline-flex h-9 w-9 items-center justify-center rounded-sm font-display text-xl font-bold">
          J
        </span>
        <span className="font-display text-2xl font-medium tracking-tight group-hover:text-brass-light">Jeopardy</span>
      </Link>
      <nav className="flex items-center gap-3 text-[15px]">{right}</nav>
    </header>
  );
}
