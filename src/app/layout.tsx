import type { Metadata, Viewport } from "next";
import { Jost, Young_Serif } from "next/font/google";
import "./globals.css";

const display = Young_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const ui = Jost({
  variable: "--font-ui",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Jeopardy", template: "%s · Jeopardy" },
  description: "Lag ditt eget Jeopardy-brett og spill det på storskjerm med mobilen som fjernkontroll.",
};

export const viewport: Viewport = {
  themeColor: "#0b1220",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const contract = `<!--
THESIS: The living room becomes a quiz studio. The board is a money ladder of lit panels under one spotlight, not a grid of cards; the studio can be re-lit in seven colour themes chosen per board. Category default refused: royal-blue tiles with gold serif numbers as the only look.
OWN-WORLD: Theme-parametric studio: a ground with one spotlight pool, nameplates (three-stop plate gradient), lit panels for points that go dark when used, one secondary field, podium plaques for teams. Roles brass/cream/stage keep their names across themes; values come from src/lib/themes.ts (default midnatt; studio is the only glowing theme). Young Serif display (sturdy, low-contrast serif for TV-distance legibility), Jost 600 for questions, numerals and UI, no italics.
STORY: Guests read points from the sofa, feel the studio; the host taps one obvious next action on the phone; scores are never in doubt.
FIRST VIEWPORT: Full-bleed stage. Top band: title left in Young Serif, sync badge and a "Koble til mobil" plate right (room code and QR only on request). Middle: category nameplates over the ladder of lit panels, monumental numerals. Bottom: podium plaques, leader on the plate. Primary action on the board is a panel; on the phone it is the one action for the current phase.
FORM: NRK quiz studio (Kvitt eller dobbelt), candidate 1 of 7 (IMPECCABLE'S PICK), chosen by user over the roll. Seed 117f6d69.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nb" className={`${display.variable} ${ui.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <div hidden dangerouslySetInnerHTML={{ __html: contract }} />
        {children}
      </body>
    </html>
  );
}
