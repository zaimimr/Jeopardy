import type { Metadata } from "next";
import { NewBoardForm } from "@/components/new-board-form";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Nytt brett" };

export default function NewBoardPage() {
  return (
    <div className="stage-spotlight flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-8 px-5 pb-16 pt-6">
        <div>
          <h1 className="font-display text-balance text-4xl font-medium leading-tight md:text-5xl">Nytt brett</h1>
          <p className="mt-2 text-lg text-cream-dim">Du kan endre alt etterpå, også antall kategorier og rader.</p>
        </div>
        <NewBoardForm />
      </main>
    </div>
  );
}
