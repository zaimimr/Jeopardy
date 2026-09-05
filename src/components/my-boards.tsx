"use client";

import Link from "next/link";
import { useLocalBoards } from "@/lib/local-boards";

export function MyBoards() {
  const { boards, ready } = useLocalBoards();
  if (!ready || boards.length === 0) return null;
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-display text-2xl font-medium">Brettene dine på denne enheten</h2>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {boards.map((board) => (
          <li key={board.id} className="brass-rim flex items-center justify-between gap-3 rounded-md bg-stage-floor/60 px-4 py-3">
            <Link href={`/brett/${board.id}`} className="min-w-0 flex-1 truncate font-display text-xl hover:text-brass-light">
              {board.title}
            </Link>
            <Link href={`/brett/${board.id}/rediger`} className="tap inline-flex items-center rounded px-3 text-sm uppercase tracking-[0.16em] text-brass hover:text-brass-light">
              Rediger
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
