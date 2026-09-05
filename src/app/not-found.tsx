import { SiteHeader } from "@/components/site-header";
import { LinkButton } from "@/components/ui";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="stage-spotlight flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-6 px-5 pb-24 text-center">
        <h1 className="font-display text-balance text-4xl leading-tight md:text-5xl">Fant ikke siden</h1>
        <p className="max-w-[40ch] text-pretty text-lg text-cream-dim">
          Har du skrevet en romkode? Trykk «Koble til mobil» på storskjermen, sjekk de fire bokstavene og prøv igjen.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <LinkButton href="/koble-til" className="min-h-14 px-7 text-lg">
            Skriv romkode
          </LinkButton>
          <Link href="/" className="tap inline-flex items-center rounded-md px-4 text-cream-dim hover:text-cream">
            Til forsiden
          </Link>
        </div>
      </main>
    </div>
  );
}
