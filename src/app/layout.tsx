import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";

const display = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
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
  themeColor: "#120d0a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const contract = `<!--
THESIS: The living room becomes an NRK quiz studio. The board is a lit money ladder under one spotlight, not a blue grid of cards. Category default refused: royal-blue tiles with gold serif numbers.
OWN-WORLD: Stage black ground with a single warm spotlight pool; brass nameplates (bevelled gradient, engraved cream text); illuminated acrylic panels for points (amber glow, cream numerals) that go dark when used; velvet red as the one secondary field; podium plaques for teams. Bodoni Moda display, Jost for numerals and UI.
STORY: Guests read points from the sofa, feel the studio; the host taps one obvious next action on the phone; scores are never in doubt.
FIRST VIEWPORT: Full-bleed stage. Top band: title left in Bodoni, room code right on a brass plate. Middle: category nameplates over the ladder of lit panels, monumental numerals. Bottom: podium plaques, leader spotlit. Primary action on the board is a panel; on the phone it is the single large brass button for the current phase.
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
