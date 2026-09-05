import type { Metadata } from "next";
import Link from "next/link";
import { MyBoards } from "@/components/my-boards";
import { SiteHeader } from "@/components/site-header";
import { LinkButton } from "@/components/ui";

export const metadata: Metadata = { title: "Jeopardy · Lag ditt eget brett og spill på storskjerm" };

const ladder = [600, 500, 400, 300, 200, 100];

export default function HomePage() {
  return (
    <div className="stage-spotlight flex min-h-dvh flex-col">
      <SiteHeader
        right={
          <Link href="/koble-til" className="tap inline-flex items-center rounded-md px-3 text-cream-dim hover:text-cream">
            Har du en romkode?
          </Link>
        }
      />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-5 pb-20 pt-8 md:px-8 md:pt-14">
        <section className="grid items-center gap-10 md:grid-cols-[1.15fr_1fr]">
          <div className="flex flex-col gap-7">
            <h1 className="font-display text-balance text-[clamp(2.6rem,6vw,5.4rem)] font-medium leading-[0.98] tracking-tight">
              Kveldens quiz, <em className="text-brass-light">rett på storskjermen.</em>
            </h1>
            <p className="max-w-[46ch] text-pretty text-xl leading-relaxed text-cream-dim">
              Lag et Jeopardy-brett med egne kategorier, spørsmål og bilder. Vis det på TV-en, og styr alt fra mobilen mens
              poengene teller seg opp for alle å se.
            </p>
            <div className="flex flex-wrap gap-3">
              <LinkButton href="/ny" className="min-h-14 px-7 text-lg">
                Lag et brett
              </LinkButton>
              <LinkButton href="/koble-til" variant="outline" className="min-h-14 px-7 text-lg">
                Koble til med romkode
              </LinkButton>
            </div>
          </div>
          <div aria-hidden className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(255,226,163,0.28),rgba(255,226,163,0)_70%)]" />
            <div className="brass-plate rounded-sm px-4 py-2 text-center font-display text-lg font-semibold tracking-wide">
              Kategori
            </div>
            <ul className="mt-2 flex flex-col gap-2">
              {ladder.map((points, index) => (
                <li
                  key={points}
                  className={`numeral flex h-14 items-center justify-center rounded-sm text-3xl ${
                    index === 1 ? "panel-unlit" : "panel-lit"
                  }`}
                >
                  {points}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Bygg brettet",
              body: "Velg antall kategorier og rader. Skriv spørsmål og svar som tekst, bilde eller begge deler. Alt lagres fortløpende.",
            },
            {
              title: "Vis på storskjerm",
              body: "Start et spill og åpne det på PC-en som står koblet til TV-en. Romkoden og QR-koden står øverst til høyre.",
            },
            {
              title: "Styr fra mobilen",
              body: "Skann QR-koden. Velg spørsmål, vis svar og gi poeng til lagene med ett trykk. Skjermen følger med umiddelbart.",
            },
          ].map((step) => (
            <div key={step.title} className="flex flex-col gap-3 border-t border-brass/40 pt-5">
              <h2 className="font-display text-2xl font-medium">{step.title}</h2>
              <p className="text-pretty leading-relaxed text-cream-dim">{step.body}</p>
            </div>
          ))}
        </section>

        <MyBoards />
      </main>
    </div>
  );
}
