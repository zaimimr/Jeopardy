import type { Metadata } from "next";
import { JoinForm } from "@/components/join-form";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Koble til" };

export default function JoinPage() {
  return (
    <div className="stage-spotlight flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-8 px-5 pb-16">
        <div>
          <h1 className="font-display text-balance text-4xl font-medium leading-tight">Koble til et spill</h1>
          <p className="mt-2 text-lg text-cream-dim">Skriv romkoden som står øverst til høyre på storskjermen.</p>
        </div>
        <JoinForm />
      </main>
    </div>
  );
}
