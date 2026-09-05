---
name: Jeopardy
description: A living-room Jeopardy board staged as a quiz studio, relit per board by one of seven colour themes, with a big screen and a phone remote.
colors:
  stage: "#0b1220"
  stage-deep: "#070b16"
  stage-floor: "#121c31"
  panel-unlit: "#0e1628"
  panel-a: "#1b2a45"
  panel-b: "#13203a"
  panel-fg: "#f4f7fb"
  brass: "#cfd7e6"
  brass-light: "#eef2f8"
  brass-dark: "#8b96ab"
  brass-ink: "#101a2c"
  plate-a: "#eef2f8"
  plate-b: "#cfd7e6"
  plate-c: "#b3bfd3"
  lamp: "#f4f7fb"
  lamp-glow: "rgba(160, 180, 220, 0.22)"
  spot: "rgba(120, 150, 210, 0.16)"
  wash: "rgba(20, 40, 80, 0.35)"
  velvet: "#1a2742"
  velvet-deep: "#111a2e"
  cream: "#eef2f8"
  cream-dim: "rgba(238, 242, 248, 0.68)"
  cream-faint: "rgba(238, 242, 248, 0.34)"
  bib-yellow: "#f3c942"
  bib-green: "#48b97c"
  bib-red: "#e05252"
  bib-blue: "#5a8fe6"
  bib-white: "#f4f0e6"
  bib-purple: "#a877e0"
  bib-orange: "#f0883e"
  bib-pink: "#e879a8"
typography:
  display:
    fontFamily: "Young Serif, Iowan Old Style, Palatino, Georgia, serif"
    fontSize: "clamp(2.6rem, 6vw, 5.4rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Young Serif, Iowan Old Style, Palatino, Georgia, serif"
    fontSize: "clamp(2.25rem, 4vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Young Serif, Iowan Old Style, Palatino, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.3
  nameplate:
    fontFamily: "Young Serif, Iowan Old Style, Palatino, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "0.025em"
  numeral:
    fontFamily: "Jost, Futura, Avenir Next, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 4.2vw, 5rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "tabular-nums lining-nums"
  question:
    fontFamily: "Jost, Futura, Avenir Next, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 6.8vw, 7.2rem)"
    fontWeight: 600
    lineHeight: 1.1
  body:
    fontFamily: "Jost, Futura, Avenir Next, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Jost, Futura, Avenir Next, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.18em"
rounded:
  plate: "4px"
  panel: "4px"
  control: "6px"
  pill: "999px"
spacing:
  hairline: "6px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "40px"
  hero: "64px"
components:
  button-brass:
    backgroundColor: "{colors.brass}"
    textColor: "{colors.brass-ink}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "48px"
    typography: "{typography.body}"
  button-brass-large:
    backgroundColor: "{colors.brass}"
    textColor: "{colors.brass-ink}"
    rounded: "{rounded.control}"
    padding: "0 28px"
    height: "56px"
  button-outline:
    backgroundColor: "{colors.stage-floor}"
    textColor: "{colors.cream}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "48px"
  button-ghost:
    textColor: "{colors.cream-dim}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "48px"
  button-ghost-hover:
    textColor: "{colors.cream}"
  button-velvet:
    backgroundColor: "{colors.velvet}"
    textColor: "{colors.cream}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "48px"
  input:
    backgroundColor: "{colors.stage-deep}"
    textColor: "{colors.cream}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
    typography: "{typography.body}"
  plate:
    backgroundColor: "{colors.plate-b}"
    textColor: "{colors.brass-ink}"
    rounded: "{rounded.plate}"
    padding: "8px 16px"
    typography: "{typography.nameplate}"
  panel-lit:
    backgroundColor: "{colors.panel-a}"
    textColor: "{colors.panel-fg}"
    rounded: "{rounded.panel}"
    typography: "{typography.numeral}"
  panel-unlit:
    backgroundColor: "{colors.panel-unlit}"
    textColor: "{colors.cream-faint}"
    rounded: "{rounded.panel}"
    typography: "{typography.numeral}"
  podium-plaque:
    backgroundColor: "{colors.stage-floor}"
    textColor: "{colors.cream}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
  podium-plaque-leader:
    backgroundColor: "{colors.plate-b}"
    textColor: "{colors.brass-ink}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
  theme-card:
    backgroundColor: "{colors.stage-floor}"
    textColor: "{colors.cream}"
    rounded: "{rounded.control}"
    padding: "8px"
  theme-card-selected:
    backgroundColor: "{colors.plate-b}"
    textColor: "{colors.brass-ink}"
    rounded: "{rounded.control}"
    padding: "8px"
  field-label:
    textColor: "{colors.brass}"
    typography: "{typography.label}"
---

# Design System: Jeopardy

## Overview

**Creative North Star: "Ett studio, sju lyssettinger"**

The living room is still a quiz studio: a lit money ladder standing on a dark stage, nameplates over the columns, a row of podium plaques for the teams. What changed is that the studio is no longer built from one fixed set of materials. The world is theme-parametric. Every surface is painted through the same small set of CSS custom properties, and a board chooses which of seven lighting rigs fills them: "Midnatt og sølv" (the default: deep navy, silver plates, cool white), "Skifer og kobber", "Burgunder og krem", "Skog og dempet messing", "Lys scene" (the one light theme), "Monokrom", and "Studio" (the original brass-and-lamplight look). The user rejected the brass glow as the default because it was too much; it survives only as the "Studio" theme, and only there do panels glow.

The token vocabulary kept its studio names as roles, not hues. `brass` is the accent and plate material, `cream` is the foreground light, `stage` is the ground, `lamp` is the points readout, `velvet` is the one secondary field. In "Midnatt" brass is silver and cream is cool white; in "Lys scene" the stage is paper and cream is near-black ink. Code never names a hue; it names a role, and the theme decides what that role looks like. The theme is stored on the board as content.theme and applied by themeStyle() to the root element of the four board surfaces: big screen, phone remote, board preview and editor. App chrome (landing, "Nytt brett", "Koble til", the 404) uses the :root defaults, which are the "Midnatt" values.

The system still has two densities. The big screen is one full-bleed viewport with no scrolling, where every size is a `clamp()` of viewport width so a 5x6 board and a 3x3 board both fill a TV. Everything else is a plain, fast tool page on the same stage: same roles, same utilities, ordinary rem sizes, centred containers. Type moved from a Didone to Young Serif, a sturdy low-contrast serif with a single weight, chosen because thin hairlines died at TV distance. Questions are now set in Jost semibold, and italics are gone from the type system. Motion is unchanged: one spotlight scale-in, one envelope slide-up, one photographic develop, one plaque flash, all on one ease.

**Key Characteristics:**
- Seven selectable themes, each a complete set of custom properties; default is "Midnatt og sølv"
- Token names are semantic roles (accent, foreground, ground, panel, plate) carried over from the studio vocabulary
- Plates for names and labels, panels for points, plaques for teams, in every theme
- Glow is a variable and is zero in six of seven themes; only "Studio" glows
- Young Serif for words read as titles, Jost 600 for numerals, controls and the question itself
- Tabular lining numerals everywhere numbers appear, one ease for all motion, everything static under reduced motion

## Colors

One set of roles, seven fills. The frontmatter values are the :root defaults ("Midnatt og sølv"); every other theme overrides the same names on the board root.

### Primary (accent, role name `brass`)
- **Accent** (`brass`): The plate material and the label colour. Flat uses: uppercase field labels, the sync dot when not live, the 50% rim on cards and inputs, hairline dividers, the checkbox accent, the text selection background. As a surface it is never flat: plates use the three-stop gradient `plate-a`, `plate-b`, `plate-c`.
- **Accent Light** (`brass-light`): The highlight. Board subtitles, the answer text on the big screen and in the phone crib, hover state of display links, the focus ring, the caret, the selection ring on active editor tiles and chosen team colours, the room code in the QR overlay.
- **Accent Dark** (`brass-dark`): Shadow tone, currently the scrollbar thumb only.
- **Plate Ink** (`brass-ink`): The text colour on every plate, so it flips with the plate: dark ink on light plates ("Midnatt", "Burgunder", "Studio"), light ink on dark plates ("Skog", "Monokrom", "Lys scene").
- **Plate stops** (`plate-a`, `plate-b`, `plate-c`): The 168deg gradient of a plate, light to dark. `plate-shadow` is the engraving text-shadow and is `none` in every theme except "Studio".

### Secondary (velvet and wash)
- **Velvet** (`velvet`): The one secondary field, used only through the velvet utility on the confirm-reset button "Ja, nullstill". It is red only in "Studio"; elsewhere it is a deeper tint of the stage.
- **Velvet Deep** (`velvet-deep`): Defined for every theme, unused in components.
- **Wash** (`wash`): The radial bleed at the bottom of every stage background. Velvet red in "Studio", a stage-coloured or black shadow elsewhere.
- **Spot** (`spot`): The lamp pool at the top of every stage background.

### Tertiary (lamp and panel light)
- **Lamp** (`lamp`): The points readout in the clue overlay and on the phone's active clue. Cool or warm white in dark themes, near-black in "Burgunder" and "Lys scene" where panels are light.
- **Lamp Glow** (`lamp-glow`): The underglow gradient inside a lit panel and the colour of its outer glow and numeral halo. Its reach is `glow-size`, 28px in "Studio" and 0px everywhere else.
- **Panel face** (`panel-a`, `panel-b`, `panel-fg`): The vertical gradient of an unused panel and the numeral colour on it. Dark faces with light numerals in five themes; cream and white faces with dark numerals in "Burgunder" and "Lys scene".

### Neutral (stage and foreground, role name `cream`)
- **Stage** (`stage`): Body background and the top of every stage gradient.
- **Stage Deep** (`stage-deep`): The html background, bottom of stage gradients, input backgrounds at 70%, the QR scrim at 92%.
- **Stage Floor** (`stage-floor`): Raised surface at 60 to 70% for cards, plaques, outline buttons and the answer card. Pure white in "Lys scene".
- **Panel Unlit** (`panel-unlit`): The dark face of a used panel.
- **Foreground** (`cream`): All primary text and numerals, and the paper behind the QR code.
- **Foreground Dim** (`cream-dim`): Secondary text, hints, the question once the answer is shown, ghost buttons at rest.
- **Foreground Faint** (`cream-faint`): Numerals on used panels, placeholders, empty-state text.

### Themes
Seven fixed rigs. Each is a full ThemeVars record in src/lib/themes.ts; the table shows the roles that decide the look. The remaining values are in the sidecar.

| Theme | Label | Stage | Accent (plate) | Foreground | Panel face | Panel ink | Glow |
| --- | --- | --- | --- | --- | --- | --- | --- |
| midnatt (default) | "Midnatt og sølv" | #0b1220 | #cfd7e6 silver | #eef2f8 | #1b2a45 to #13203a | #f4f7fb | 0 |
| skifer | "Skifer og kobber" | #15181c | #b87352 copper | #f2ede6 | #262a30 to #1c2025 | #f6efe6 | 0 |
| burgunder | "Burgunder og krem" | #2a1218 | #e0c49a cream plate | #f6eee4 | #fbf5ea to #efe3d2 | #3a1a22 | 0 |
| skog | "Skog og dempet messing" | #0f1f1a | #cdb37a brass line, dark green plates | #eef3ee | #1c382e to #142a22 | #f3f0e6 | 0 |
| lys | "Lys scene" | #f4efe6 paper | #7a5a1e, plates near-black | #1d1a16 ink | #ffffff to #f7f2ea | #1d1a16 | 0 |
| monokrom | "Monokrom" | #0d0d0f | #b8b8b0 grey, dark plates | #f5f5f2 | #1a1a1e to #131316 | #f5f5f2 | 0 |
| studio | "Studio" | #120d0a | #d4a648 brass | #fff2d6 | #3a2612 to #22160c amber | #fff2d6 | 28px |

"Lys scene" is the only theme with `color-scheme: light`. In "Skog", "Monokrom" and "Lys scene" the plate gradient is darker than the accent, so `brass-ink` is light and the accent is used for labels and rims only.

### Team bibs
Eight fixed team colours (`bib-yellow`, `bib-green`, `bib-red`, `bib-blue`, `bib-white`, `bib-purple`, `bib-orange`, `bib-pink`) live on :root and do not change with the theme. They appear as a glossy bib dot beside a team name, as a 3px inset underline on a non-leading podium plaque, and as the tinted award and deduct buttons (green at 20 to 22% with green text, red at 20 to 22% with red text). `bib-green` doubles as the live sync dot; `bib-red` doubles as the error text colour and the reset-confirmation wash at 12%.

### Named Rules
**The Roles Not Hues Rule.** A component names a role (`brass`, `cream`, `stage-floor`, `panel-fg`), never a colour. No hex, rgb or Tailwind palette colour may appear in a component or page, because it will be wrong in six of seven themes. The only exceptions are the eight bib colours and the QR code's module colours.

**The Theme Root Rule.** A theme is applied once, as inline custom properties from themeStyle() on the root element of a board surface. Nothing below the root re-declares a theme variable, and app chrome never applies a theme; it inherits the :root "Midnatt" defaults.

**The Plate Is Material Rule.** Anything that reads as a plate uses the three-stop plate gradient with its inset highlight and bottom edge; anything merely accent-edged uses the rim at 50% accent. The accent is not painted flat on a surface.

**The One Velvet Rule.** The velvet utility appears in exactly one place: the confirm-reset button. It is not a hover colour, an error colour or a decorative field.

## Typography

**Display Font:** Young Serif, one weight (400), no italic (with Iowan Old Style, Palatino, Georgia, serif)
**Body Font:** Jost (with Futura, Avenir Next, system-ui, sans-serif)
**Numeral Font:** Jost, weight 600, tabular lining figures

**Character:** A sturdy, low-contrast serif for anything that is a title or a name, chosen for legibility at two to five metres; a geometric sans for everything a hand operates or an eye counts, including the question itself. Body text is set globally with tabular and lining numerals so scores never jitter.

### Hierarchy
- **Display** (400, `clamp(2.6rem, 6vw, 5.4rem)`, 0.98): The landing hero only. Tight tracking, balanced wrap, the emphasised phrase in accent light.
- **Headline** (400, 2.25rem rising to 3rem or 3.75rem at md, 1.1 to 1.25): Page titles on tool pages ("Nytt brett", "Koble til et spill", "Fant ikke siden", the board title on the board page). On the big screen the board title is `clamp(1.6rem, 3.4vw, 3.6rem)` at line-height 1.
- **Title** (400, 1.5rem, 1.3): Section headings in the editor and landing ("Brettet", "Fargetema", "Bygg brettet", "Brettene dine på denne enheten"), the site wordmark, board titles in the my-boards list.
- **Subtitle** (400, 1.25rem to 1.5rem, accent light): The board subtitle under any title. Upright, never italic.
- **Nameplate** (400 Young Serif, 1.125rem, 1.05, tracking 0.025em): Text on plates. On the big screen categories scale with `clamp(0.95rem, 1.7vw, 1.9rem)` and clamp to two lines. Board preview 0.875rem rising to 1rem at md. Phone mini board 11px.
- **Numeral** (600 Jost, tabular lining, tracking -0.02em): Points and scores. Board panels `clamp(1.6rem, 4.2vw, 5rem)`; scoreboard plaques `clamp(2rem, 4vw, 4.2rem)`, or `clamp(1.6rem, 3vw, 3.2rem)` above five teams; the overlay points readout `clamp(1.6rem, 3.2vw, 3.4rem)`; the room code in the QR overlay `clamp(2.4rem, 5vw, 5rem)` bold with 0.2em tracking; the phone's room-code plate 1.125rem bold with 0.15em tracking; the join field 3rem bold with 0.3em tracking.
- **Question** (600 Jost, foreground): The question on the big screen. Centred, balanced, capped at 24ch, line-height 1.1. Size steps down by length: up to 80 characters `clamp(2.6rem, 6.8vw, 7.2rem)`, up to 160 `clamp(2.2rem, 5.4vw, 5.6rem)`, longer `clamp(1.8rem, 4.2vw, 4.2rem)`, and `clamp(1.6rem, 3.4vw, 3.2rem)` when an image shares the frame. The 7.2rem ceiling is a deliberate user decision: clue text is meant to be very large.
- **Answer** (400 Young Serif, accent light): The answer on the big screen, same size ladder and cap as the question. On the phone crib `clamp(1.25rem, 5vw, 1.9rem)`, in the phone answer phase `clamp(2rem, 9vw, 3.6rem)`.
- **Body** (400, 17px on controls and inputs, 1.25rem for lead paragraphs, 1.6 to 1.625): Descriptions, hints and form copy in foreground dim. Lead copy caps at 46ch.
- **Label** (400, 0.875rem, tracking 0.18em, uppercase, accent): Field labels. Status labels use the same treatment at 0.75rem to 0.8rem in foreground dim with 0.18 to 0.22em tracking. The phone crib label is 11px semibold with 0.3em tracking in accent.

### Named Rules
**The Two Voices Rule.** Young Serif speaks for names and titles (board title, category, team name, answer). Jost speaks for numbers, actions and the question (points, scores, buttons, tabs, question text). No third face, no serif in a button, no Jost on a nameplate.

**The One Weight Rule.** Young Serif is loaded at 400 only. Weight utilities on display text do not change the face: `font-medium` renders as 400 and `font-semibold` or `font-bold` are browser-synthesised. Hierarchy in the display face comes from size and colour, not weight; treat existing weight classes on display text as inert.

**The No Italic Rule.** The display face has no italic and the type system uses none. The single remaining `<em>` on the landing hero renders as a synthesised slant and is emphasis by colour, not by style.

**The Tabular Numeral Rule.** Every number is set with the numeral utility or inherits the global tabular lining feature settings. Scores roll from old to new value over 700ms and must not shift width while doing so.

## Layout

The big screen is one viewport: a flex column at `100dvh` with overflow hidden, padded `2.2vw` horizontally and about `1.5vh` vertically. It stacks a header band (title and subtitle left; sync status and a small plate button "Koble til mobil" right), the board grid, and the podium footer. The room code is not on the permanent header; it is shown large only inside the QR overlay so that guests cannot read it off the TV all evening. The grid uses `repeat(columns, minmax(0, 1fr))` for categories and `auto repeat(rows, minmax(0, 1fr))` for the nameplate row plus panels, with a `0.8vw` gap, so any board shape up to 8x8 fills the screen without scrolling. Category plates keep a minimum height of `6vh`. The scoreboard is a single row with one column per team, gap 12px, tightening to 8px and smaller type above five teams; up to eight teams fit. Overlays (clue, QR) are absolutely positioned over the whole stage.

Tool pages share a template: the stage-spotlight background on a `min-h-dvh` flex column, the site header (padding 16px 20px, 32px horizontal at md), then a centred main column with 20px side padding (32px at md). Container widths step by job: `max-w-md` (448px) for the join form, `max-w-xl` (576px) for new board and not-found, `max-w-5xl` (1024px) for the board page, `max-w-6xl` (1152px) for the landing, `max-w-7xl` (1280px) for the editor. Vertical rhythm inside a page is 32px to 40px between sections and 64px between landing sections; inside a form 24px between fields and 8px between a label and its control. The editor stacks title and subtitle, the share-link box, the theme picker ("Fargetema"), the board grid, and the clue editor for the selected tile.

The phone remote is a portrait flex column with safe-area padding top and bottom, 16px side padding, 16px between blocks. A two-tab segmented control sits under the header; the current phase decides what the "Spill" tab shows (mini board or active clue). The mini board reuses the exact board grid at 6px gap with 36px nameplates. Award rows are one line each: bib dot, name, score, then a green and a red numeral button of at least 4.5rem width. Below the mini board a compact two-column scoreboard and a "Sist: …" line with "Angre" sit at the bottom.

Breakpoints in use are Tailwind's `sm` (640px), `md` (768px) and `lg` (1024px). Only `md` carries layout changes (two-column hero, three-column steps, larger headline sizes); `sm` reveals secondary header links and two-column grids; `lg` splits the clue editor into question and answer columns. The theme picker is two columns, four at `sm`, seven at `lg`. The editor grid enforces a 640px minimum width and scrolls horizontally inside its own container.

## Elevation & Depth

Depth is material, not shadow, and the materials are variable-driven. Surfaces are layered as stage-deep under stage under stage-floor, with translucent floors (60 to 70%) letting the spotlight gradient show through. Only two things carry drop shadows: plates (a soft 18px drop at 50% black tucked under the bevel) and lit panels (a tight 24px black drop, plus an outer glow whose reach is `glow-size`). Inset shadows do the real work: a 1px white highlight at 28% on the top edge and a 2px black line at 28% on the bottom edge make a plate read as a bevelled tile in any theme; a 1px inner ring at 38% accent and a 1px white top highlight at 16% make a panel read as a framed block.

Glow is a theme property. `glow-size` is 0px in six themes, which collapses the panel's outer glow and numeral halo to nothing, so the default board is matte. Only "Studio" sets 28px and gets the amber halo. Brightness, not shadow, signals interaction: hover on plates and lit panels is `brightness(1.1)`; lit panels also lift by 2px. Pressing a button translates it down 1px.

### Shadow Vocabulary
- **Plate** (`inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -2px 0 rgba(0,0,0,0.28), 0 6px 18px -6px rgba(0,0,0,0.5)` with `text-shadow: var(--plate-shadow)`): Every plate surface. The text-shadow is `none` except in "Studio".
- **Rim** (`inset 0 1px 0 color-mix(brass-light 22%), inset 0 -1px 0 rgba(0,0,0,0.35)` with a 1px border at 50% accent): Dark cards, outline buttons, inputs, plaques, the tab list, the theme cards.
- **Panel lit** (`inset 0 1px 0 rgba(255,255,255,0.16), inset 0 0 0 1px color-mix(brass 38%), 0 0 var(--glow-size) -4px var(--lamp-glow), 0 10px 24px -14px rgba(0,0,0,0.6)` with `text-shadow: 0 0 var(--glow-size) var(--lamp-glow)`): Unused points panels.
- **Panel unlit** (`inset 0 0 0 1px color-mix(brass 14%)`): Used points panels. No glow, no text shadow.
- **Bib dot** (`0 0 {size}px {bib}66`): The coloured halo around a team dot, theme-independent.
- **Team underline** (`inset 0 -3px 0 {bib}`): The team colour stripe along the bottom of a non-leading plaque.
- **Photo** (`drop-shadow(0 20px 40px rgba(0,0,0,0.6))`): Clue images on the big screen.
- **Overlay points halo** (`text-shadow: 0 0 24px rgba(255,226,163,0.55)`): The points readout in the clue overlay. Still a hardcoded amber value from the studio build.
- **Flash** (`0 0 40px 6px rgba(255,226,163,0.55)` at 30% of a 900ms keyframe): A podium plaque whose score just changed. Also still hardcoded amber.

### Named Rules
**The Lit-Or-Dark Rule.** A points panel is either lit (panel face, panel ink, ring) or dark (flat unlit face, faint numeral, no shadow). There is no half state; the transition between them is 300ms on the stage ease.

**The Glow Is Studio-Only Rule.** Glow is `glow-size`, and only "Studio" sets it above zero. No component adds its own glow; the two remaining hardcoded amber glows (overlay points halo, plaque flash) are debt to be moved onto `lamp-glow`.

## Shapes

Corners are barely rounded and follow the material. Plates and panels use 4px (`rounded-sm`), which reads as a machined edge. Controls, cards, inputs, plaques and theme cards use 6px (`rounded-md`). Small inner controls like award buttons, tabs and the stepper's plus and minus use Tailwind's bare `rounded` (4px). Bib dots, the colour picker circles, the status dots and the scrollbar thumb are fully round. The QR paper inside its plate uses 4px, and the theme swatch strip 4px.

Borders are thin and accent-coloured: 1px at 50% for rims, 1px at 40% for landing section dividers, dashed at 40% for the image drop zone, 25% for the phone crib divider, 20% for the remote's footer divider. There are no thick strokes and no borders in the foreground colour. Focus is a 2px accent-light outline offset 3px, drawn outside the shape. Selection rings (editor tile, chosen team colour) are 2px accent light.

The recurring silhouette is a wide, short rectangle: a nameplate over a ladder of panels over a row of plaques. The landing hero repeats it in miniature as a six-step lit ladder with one dark rung, and the theme picker repeats the plate-over-panel idea as a three-stripe swatch over a label.

## Components

### Buttons
- **Character:** Podium controls. Flat-faced, 48px tall, 17px Jost with wide tracking, never uppercase.
- **Shape:** 6px corners, 20px side padding, gap 8px between icon and label. Large variant is 56px tall with 28px padding at 1.125rem.
- **Brass (primary):** Plate gradient with plate-ink text, semibold. Used for the one main action per view: "Lag et brett", "Lag brettet", "Start spill", "Start spill på storskjerm", "Åpne fjernkontroll", "Skriv romkode", "Lukk og tilbake til brettet", the active tab.
- **Outline:** Rim over stage-floor at 60%, foreground text. Secondary actions: "Koble til med romkode", "Rediger brettet", "Legg til lag", "+ Kategori", "+ Rad", "Kopier redigeringslenke", "Velg bilde", and the phone's "Vis svar på skjermen".
- **Ghost:** Foreground-dim text, no border, hovers to foreground on a 5% white wash. Tertiary and escape actions: "Angre", "Tilbake", "Fjern", "Lukk", "Avbryt", "Lag min egen kopi", "Nullstill spillet", "− Siste rad".
- **Velvet:** Velvet material with foreground text, semibold. Only for the destructive confirm "Ja, nullstill".
- **Hover / Active / Disabled:** Brass and velvet brighten 10%; all press down 1px; disabled drops to 40 to 50% opacity and loses hover. Transitions run 200ms on transform, filter, background and colour.
- **Deliberate exception:** The big screen's "Vis svar" is intentionally small (rim over stage-floor, `clamp(0.9rem, 1.1vw, 1.1rem)`, bottom right, foreground dim) because the whole overlay is the tap target and the host normally advances from the phone. Its answer-phase sibling "Lukk" is a plate. Beside them sits a ghost escape: "Feil rute? Tilbake til brettet" in the question phase, "Tilbake til spørsmålet" in the answer phase.

### Plates (nameplates)
- **Style:** Plate gradient, 4px corners, 8px 16px padding, Young Serif 1.125rem with 0.025em tracking in plate ink, text-shadow from `plate-shadow`.
- **Where:** Category headers on every board (big screen, board preview, editor, phone mini board), the phone remote's room-code plate (bold spaced numeral), the big screen's "Koble til mobil" button (uppercase Jost at `clamp(0.8rem, 1vw, 1rem)` with 0.18em tracking beside a 16px inline phone outline), the category chip in the clue overlay, the phone active clue and the clue editor, the active tab, the leader's podium plaque, the selected theme card, the wordmark "J" square.
- **Editable plate:** In the editor the category title is a transparent input inside the plate; focus adds a 15% black wash. Move chevrons (inline SVG) and "Slett" sit under it in plate ink at 28px height.

### Panels (points)
- **Lit:** Vertical gradient from `panel-a` to `panel-b` with a `lamp-glow` radial underglow, numeral in `panel-fg`, 38% accent inner ring, outer glow of `glow-size`. Hover lifts 2px and brightens.
- **Unlit:** Flat `panel-unlit` with a 14% accent inner ring, faint numeral, no glow. Hover only warms the numeral to foreground dim.
- **Active:** The opened panel fades to zero opacity while the overlay covers the board.
- **Sizes:** Big screen fills the grid cell; landing ladder 56px tall at 1.875rem; board preview 48px to 64px; editor tile a minimum 80px tall with the numeral top-left and a two-line clue preview beneath, lit when both question and answer have content; phone mini board 48px minimum with 1rem numerals and long-press (550ms) to toggle used.

### Podium plaques (scoreboard)
- **Style:** 6px corners, 16px side and 12px vertical padding, bib dot plus team name in Young Serif over a large tabular score. Non-leaders are rim over stage-floor at 70% with the team colour as a 3px inset underline. The sole leader becomes a full plate.
- **Behaviour:** Scores roll to the new value over 700ms with a cubic ease-out. A plaque whose score just changed flashes for 900ms. Above five teams the gap drops to 8px, names to `clamp(0.95rem, 1.3vw, 1.4rem)` and scores to `clamp(1.6rem, 3vw, 3.2rem)`. Compact variant (phone) is two columns with 12px dots and 1.875rem scores.

### Theme picker (editor)
- **Character:** A radiogroup of seven swatch cards under the heading "Fargetema" with the hint "Gjelder storskjermen, mobilen og denne siden."
- **Card:** 6px corners, 8px padding, tap height, column of a 36px three-stripe swatch (4px corners, the theme's stage, accent and panel colours) over the theme label at 15px. Unselected cards are rim over stage-floor at 60%, hovering to solid stage-floor. The selected card is a full plate, so it reads as the chosen nameplate.
- **Behaviour:** Choosing a card writes content.theme and the whole editor page repaints immediately, since the editor root carries the theme.

### Cards / Containers
- **Corner Style:** 6px.
- **Background:** Stage-floor at 60 to 70% for content cards (answer card, my-boards items, team editor, clue editor, phone active clue); stage-deep at 40 to 70% for form-like containers (share link box, demo checkbox, tab list, stepper).
- **Border:** Rim, always. No shadow beyond the rim insets.
- **Internal Padding:** 12px to 16px for rows, 16px for boxes, 20px to 24px for the clue editor. The answer card on the big screen pads `2vh` and holds at least `32vh` when it has no image.

### Inputs / Fields
- **Style:** Rim on stage-deep at 70%, 6px corners, 16px side and 12px vertical padding, 17px Jost in foreground, placeholders in foreground faint. Textareas start at 96px tall and resize vertically.
- **Label:** Uppercase 0.875rem Jost in accent with 0.18em tracking, 8px above the control; a hint in foreground dim sits 8px below.
- **Focus:** Background deepens to solid stage-deep; the global 2px accent-light outline appears 3px outside; caret is accent light.
- **Specialised:** The board title input keeps the field style but sets Young Serif at 1.875rem. The room-code field is centred 3rem bold numerals with 0.3em tracking. The stepper is a rimmed box with 48px plus and minus targets around a 1.5rem numeral. Checkboxes use the accent colour. The image drop zone is a dashed 40% accent border on stage-deep at 40%, at least 144px tall. The team name and score inputs on the phone are rimless stage-deep at 70% with 4px corners.
- **Error:** Messages in `bib-red`; blocking errors sit in a `bib-red` wash at 12 to 20% with 6px corners.

### Navigation
- **Site header:** Wordmark (plate "J" square at 36px plus "Jeopardy" in Young Serif 1.5rem, hovering to accent light) left, a slot of ghost links and one brass button right, 15px Jost. Ghost links are foreground dim hovering to foreground.
- **Big-screen header:** Title and subtitle left; right, an uppercase status label ("Direkte", "Oppdaterer", "Kobler til") with an 8px dot (green when live, accent otherwise) and the "Koble til mobil" plate button that opens the QR overlay. Icons are inline SVG outlines at 1.6 to 1.75 stroke in currentColor, never an icon font.
- **Remote tabs:** A two-cell segmented control in a rimmed stage-deep box with 4px padding. The active tab is a plate; the inactive is foreground dim. Labels are 15px uppercase semibold with 0.16em tracking ("Spill", "Lag (n)"). When a clue is open the "Spill" tab is forced.
- **Big-screen keyboard map:** Arrows move between panels, Enter or Space opens and advances, Esc cancels a clue or closes the QR overlay, U undoes, Q toggles the QR overlay, F toggles fullscreen.

### Phone active clue
The remote mirrors the overlay in miniature: category plate and lamp points on one line, then a rimmed stage-floor card. During the question phase the card shows the question in Jost (`clamp(1.6rem, 7vw, 3rem)`) and, below a 25% accent hairline, a host-only crib: an 11px uppercase accent label with 0.3em tracking ("Svar · bare du ser dette"), an optional answer thumbnail capped at 112px, and the answer in Young Serif accent light. In the answer phase the question dims and the answer takes over at `clamp(2rem, 9vw, 3.6rem)`. Below the card, a one-third ghost and two-thirds outline pair ("Feil rute? Tilbake" and "Vis svar på skjermen") in the question phase; award rows and a ghost plus brass pair ("Tilbake" and "Lukk og tilbake til brettet") in the answer phase.

### Clue overlay (signature)
The reveal is the memorable moment. Opening a panel scales the full stage overlay in over 420ms. The header carries the category on a plate and the points in lamp with a halo. The question fills the middle in monumental Jost semibold, and the whole area is one button that advances. On "Vis svar" the question shrinks to foreground dim above and the answer card slides up like an envelope over 520ms: a rimmed stage-floor card holding the answer in Young Serif accent light, or a photo that develops from blurred and dark to sharp over 1100ms. Award controls appear beneath as one rimmed chip per team with green and red numeral buttons. The QR overlay uses the same spotlight-in over a 92% stage-deep blurred scrim: a Young Serif heading "Skann med mobilen", a plate frame around foreground-coloured paper with a 280px code, the join address in foreground dim, the room code in monumental accent-light numerals, and a small uppercase warning "Alle som har koden kan styre spillet. Trykk hvor som helst for å lukke". It closes on any click or Esc.

### Board editor (in progress)
The committed editor selects a tile to open the clue editor and moves whole categories with chevrons. Drag-to-reorder clues within and across columns, with points following the row, is uncommitted work in progress in src/components/board-editor.tsx and src/lib/use-clue-drag.ts and is not yet part of the documented system.

### Motion
- **Ease:** One curve for everything, `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Durations:** 200ms button state, 300ms panel lit-to-dark, 420ms spotlight-in, 520ms envelope, 700ms score roll, 900ms flash, 1100ms develop.
- **Reduced motion:** All keyframe animations are removed and transitions collapse to near zero. Score rolling completes in one frame.

## Do's and Don'ts

### Do:
- **Do** build every new page on the stage-spotlight background inside a `min-h-dvh` flex column with the site header, and apply themeStyle() on the root when the page belongs to a board.
- **Do** colour everything through role tokens (`brass`, `cream`, `stage-floor`, `panel-fg`, `plate-a`) so it survives all seven themes; check a change in "Lys scene" and "Burgunder" as well as the default, since those flip panel and plate polarity.
- **Do** paint anything named or titled on a plate in plate ink and Young Serif, and anything counted on a panel or plaque in tabular Jost 600.
- **Do** size big-screen text with `clamp()` against viewport width so it survives an 8x8 board on a TV at 2 to 5 metres; clue text may reach 7.2rem.
- **Do** keep controls at least 48px tall (`tap`) on any surface a host touches, and 56px for the one primary action on a view.
- **Do** use exactly one brass button per view; every other action is outline or ghost.
- **Do** mark state with material, not colour: lit versus unlit panels, plate versus rim for the leader and the selected theme, the green dot for a live connection.
- **Do** show all UI copy in Norwegian bokmål with verb-first host labels.

### Don't:
- **Don't** hardcode a hue in a component or page, or reach for a Tailwind palette colour; the only fixed colours are the eight bibs and the QR module colours.
- **Don't** add glow, halo or amber to a component; glow is `glow-size` and belongs to the "Studio" theme alone.
- **Don't** flatten the accent into a solid fill on a plate or a tinted border; plates use the three-stop gradient and rims use the 50% accent hairline.
- **Don't** add velvet outside the reset confirmation.
- **Don't** add drop shadows to cards, inputs or buttons; depth comes from inset highlights and translucent floors.
- **Don't** use italics anywhere, or rely on font-weight to differentiate display text; Young Serif has one weight and no italic.
- **Don't** put Young Serif on a button, a numeral or the question, or Jost on a nameplate.
- **Don't** let the big-screen board scroll, wrap category plates past two lines, or introduce a second animation ease.
- **Don't** apply a theme anywhere but the root of a board surface, and never on app chrome.
- **Don't** write code comments in this repository; the design is carried by tokens, utilities and this document.
