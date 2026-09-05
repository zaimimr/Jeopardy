---
name: Jeopardy
description: A living-room Jeopardy board staged as an NRK quiz studio, with a brass-and-lamplight big screen and a phone remote.
colors:
  stage: "#120d0a"
  stage-deep: "#070403"
  stage-floor: "#1d140e"
  panel-unlit: "#1a120d"
  brass: "#d4a648"
  brass-light: "#f3dc93"
  brass-dark: "#7d5a1c"
  brass-ink: "#2a1c08"
  lamp: "#ffe2a3"
  lamp-glow: "rgba(255, 196, 105, 0.45)"
  velvet: "#8b1e2d"
  velvet-deep: "#56111c"
  cream: "#fff2d6"
  cream-dim: "rgba(255, 242, 214, 0.64)"
  cream-faint: "rgba(255, 242, 214, 0.36)"
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
    fontFamily: "Bodoni Moda, Bodoni MT, Didot, Georgia, serif"
    fontSize: "clamp(2.6rem, 6vw, 5.4rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Bodoni Moda, Bodoni MT, Didot, Georgia, serif"
    fontSize: "clamp(2.25rem, 4vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Bodoni Moda, Bodoni MT, Didot, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.3
  nameplate:
    fontFamily: "Bodoni Moda, Bodoni MT, Didot, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "0.025em"
  numeral:
    fontFamily: "Jost, Futura, Avenir Next, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 4.2vw, 5rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "tabular-nums lining-nums"
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
    backgroundColor: "{colors.brass}"
    textColor: "{colors.brass-ink}"
    rounded: "{rounded.plate}"
    padding: "8px 16px"
    typography: "{typography.nameplate}"
  panel-lit:
    backgroundColor: "{colors.panel-unlit}"
    textColor: "{colors.cream}"
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
    backgroundColor: "{colors.brass}"
    textColor: "{colors.brass-ink}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
  field-label:
    textColor: "{colors.brass}"
    typography: "{typography.label}"
---

# Design System: Jeopardy

## Overview

**Creative North Star: "Kvitt eller dobbelt-studioet"**

The living room becomes an NRK quiz studio. The board is a lit money ladder standing on a black stage under one warm spotlight, not a blue grid of cards. Everything is built from four studio materials: stage black (matte, near-black brown), brass (bevelled gradient nameplates with engraved dark text), lamplit amber acrylic (the points panels, glowing from below, dark when spent), and one field of velvet red (the confirm-destructive colour and the warm bleed at the bottom of every stage). Cream is the light, never pure white.

The system has two densities. The big screen at /spill/[code] is a full-bleed single viewport with no scrolling, where every size is a `clamp()` of viewport width so a 5x6 board fills a TV and a 3x3 board fills it the same way. Everything else (landing, forms, editor, phone remote) is a plain, fast tool page on the same stage: same tokens, same materials, ordinary rem sizes, centered containers. The board is the show; the tools recede.

Motion is theatrical but sparse: one spotlight scale-in for overlays, one envelope slide-up for the answer card, one photographic develop for answer images, one flash for a scoreboard plaque that just changed. Everything uses one custom ease and nothing loops. The category default that was refused is royal-blue tiles with gold serif numbers; this world never uses blue as a surface.

**Key Characteristics:**
- Stage black ground with a radial lamp pool at the top and a velvet bleed at the bottom
- Brass plates for names and labels (categories, room code, leader, primary buttons); brass is a material, not an accent tint
- Points live on lit acrylic panels: amber underglow, cream numerals with a soft halo, going dark when used
- Bodoni Moda for words that are read as titles, Jost for numerals and every control
- Tabular lining numerals everywhere numbers appear
- One custom ease for all motion, all animations disabled under reduced motion

## Colors

A warm, low-key palette of blacks, brass and cream, lit from within by amber and grounded by one velvet red.

### Primary (brass)
- **Brass** (`brass`): The nameplate material. Used as the flat token for the field-label colour, the sync dot when not live, the divider hairlines at 40% and the checkbox accent. As a surface it is never flat: the brass-plate utility paints a six-stop bevelled gradient from pale gold through deep brass.
- **Brass Light** (`brass-light`): Highlight brass. Subtitles in italic Bodoni, answer text on the big screen, hover state of display links, the focus ring, the caret, and the selection ring on active editor tiles and chosen team colours.
- **Brass Dark** (`brass-dark`): Shadow brass. The scrollbar thumb. Reserved for depth, never for text.
- **Brass Ink** (`brass-ink`): The engraved text colour on every brass plate and the dark module colour of QR codes. Never used on stage black.

### Secondary (velvet)
- **Velvet** (`velvet`): The one red field. The velvet button variant used only for confirming a reset, and the 35% radial bleed at the bottom of every stage background. Rendered with a faint vertical pinstripe so it reads as fabric, not as a flat fill.
- **Velvet Deep** (`velvet-deep`): Reserved shadow tone for the velvet material. Defined, currently unused in components.

### Tertiary (lamp)
- **Lamp** (`lamp`): The light itself. Points readout in the clue overlay (with a 24px halo), the spotlight pool at the top of stage backgrounds at 22%, and the flash keyframe.
- **Lamp Glow** (`lamp-glow`): The outer glow of a lit panel, used only inside the panel-lit box-shadow.

### Neutral (stage and cream)
- **Stage** (`stage`): The body background and the top of every stage gradient. Warm near-black.
- **Stage Deep** (`stage-deep`): The html background, the bottom of stage gradients, input backgrounds at 70%, and the QR dialog scrim at 92%.
- **Stage Floor** (`stage-floor`): Raised dark surface at 60 to 70% opacity for cards, plaques, outline buttons and the answer card.
- **Panel Unlit** (`panel-unlit`): The dark acrylic of a used panel and the base tone under lit panels.
- **Cream** (`cream`): All primary text and numerals. Also the paper behind QR codes.
- **Cream Dim** (`cream-dim`): Secondary text, hints, questions once the answer is shown, ghost buttons at rest.
- **Cream Faint** (`cream-faint`): Numerals on used panels, placeholders, empty-state italics.

### Team bibs
Eight fixed team colours (`bib-yellow`, `bib-green`, `bib-red`, `bib-blue`, `bib-white`, `bib-purple`, `bib-orange`, `bib-pink`). They appear only as a glossy bib dot beside a team name, as a 3px inset underline on a non-leading podium plaque, and as the tinted award and deduct buttons (green at 20 to 22% with green text; red at 20 to 22% with red text). `bib-green` doubles as the live sync dot; `bib-red` doubles as the error text colour.

### Named Rules
**The Brass Is Metal Rule.** Brass is never a flat background on a surface. Anything that reads as a plate uses the bevelled brass-plate gradient with its inset highlight and shadow; anything that is merely brass-edged uses brass-rim at 55% opacity.

**The One Velvet Rule.** Velvet red appears in exactly two places: the bottom bleed of a stage and the confirm-reset button. It is not a hover colour, an error colour or a decorative field.

**The No Blue Surface Rule.** Blue exists only as a team bib. There are no blue tiles, blue links or blue focus rings.

## Typography

**Display Font:** Bodoni Moda, variable with optical size axis, normal and italic (with Bodoni MT, Didot, Georgia, serif)
**Body Font:** Jost (with Futura, Avenir Next, system-ui, sans-serif)
**Numeral Font:** Jost, weight 600, tabular lining figures

**Character:** High-contrast Didone serif for anything that is a title or an engraved name, geometric sans for everything a hand operates or an eye counts. Body text is set globally with tabular and lining numerals so scores never jitter.

### Hierarchy
- **Display** (500, `clamp(2.6rem, 6vw, 5.4rem)`, 0.98): The landing hero only. Tight tracking, balanced wrap, the emphasised phrase in italic brass-light.
- **Headline** (500, 2.25rem rising to 3rem or 3.75rem at md, 1.1 to 1.25): Page titles on tool pages ("Nytt brett", "Koble til et spill", board title on the board page). On the big screen the board title is `clamp(1.6rem, 3.4vw, 3.6rem)` at line-height 1.
- **Title** (500, 1.5rem, 1.3): Section headings in the editor and landing ("Brettet", "Bygg brettet"), the site wordmark, board titles in the my-boards list.
- **Subtitle** (400 italic, 1.25rem to 1.5rem, brass-light): The board subtitle under any title, always italic Bodoni.
- **Nameplate** (600, 1.125rem, 1.05, tracking 0.025em, Bodoni): Engraved text on brass plates. On the big screen categories scale with `clamp(0.85rem, 1.55vw, 1.7rem)` and clamp to two lines. On the phone mini board they drop to 11px.
- **Numeral** (600 Jost, tabular lining, tracking -0.02em): Points and scores. Board panels `clamp(1.6rem, 4.2vw, 5rem)`; scoreboard plaques `clamp(2rem, 4vw, 4.2rem)` (or `clamp(1.6rem, 3vw, 3.2rem)` with more than five teams); room code plate `clamp(1.3rem, 2.4vw, 2.4rem)` with 0.12em tracking; join field 3rem bold with 0.3em tracking.
- **Clue text** (500): The question on the big screen is Jost in cream, the answer is Bodoni Moda in brass-light. Both are centred, balanced and capped at 24ch. Size steps down by length: up to 80 characters `clamp(2.6rem, 6.8vw, 7.2rem)`, up to 160 `clamp(2.2rem, 5.4vw, 5.6rem)`, longer `clamp(1.8rem, 4.2vw, 4.2rem)`, and `clamp(1.6rem, 3.4vw, 3.2rem)` when an image shares the frame. The 7.2rem ceiling is deliberate: the user asked for very large clue text.
- **Body** (400, 17px on controls and inputs, 1.25rem for lead paragraphs, 1.6 to 1.625): Descriptions, hints and form copy in cream-dim. Lead copy caps at 46ch.
- **Label** (400, 0.875rem, tracking 0.18em, uppercase, brass): Field labels. Status labels use the same treatment at 0.75rem to 0.8rem in cream-dim with 0.18 to 0.22em tracking.

### Named Rules
**The Two Voices Rule.** Bodoni speaks for names and titles (board title, category, team name, answer). Jost speaks for numbers and actions (points, scores, buttons, questions). No third face, no Bodoni in a button, no Jost in a nameplate.

**The Tabular Numeral Rule.** Every number is set with the numeral utility or inherits the global tabular lining feature settings. Scores roll from old to new value over 700ms and must not shift width while doing so.

## Layout

The big screen is one viewport: a flex column at `100dvh` with overflow hidden, padded `2.2vw` horizontally and about `1.5vh` vertically. It stacks a header band (title left, sync status and room-code plate right), the board grid, and the podium footer. The grid uses `repeat(columns, minmax(0, 1fr))` for categories and `auto repeat(rows, minmax(0, 1fr))` for the nameplate row plus panels, with a `0.8vw` gap, so any board shape fills the screen without scrolling. Category plates keep a minimum height of `6vh`. The scoreboard is a single row with one column per team (two columns when compact on the phone), gap 12px, tightening to 8px above five teams. Overlays (clue, QR) are absolutely positioned over the whole stage.

Tool pages share a template: the stage-spotlight background on a `min-h-dvh` flex column, the site header (padding 16px 20px, 32px horizontal at md), then a centred main column with 20px side padding (32px at md). Container widths step by job: `max-w-md` (448px) for the join form, `max-w-xl` (576px) for new board and not-found, `max-w-5xl` (1024px) for the board page, `max-w-6xl` (1152px) for the landing, `max-w-7xl` (1280px) for the editor. Vertical rhythm inside a page is 32px to 40px between sections and 64px between landing sections; inside a form 24px between fields and 8px between a label and its control.

The phone remote is a portrait flex column with safe-area padding top and bottom, 16px side padding, 16px between blocks. A two-tab segmented control sits under the header; the current phase decides what the "Spill" tab shows (mini board or active clue). The mini board reuses the exact board grid at 6px gap with 36px nameplates. Award rows are one line each: bib dot, name, score, then a green and a red numeral button of at least 4.5rem width.

Breakpoints in use are Tailwind's `sm` (640px), `md` (768px) and `lg` (1024px). Only `md` carries layout changes (two-column hero, three-column steps, larger headline sizes); `sm` reveals secondary header links and two-column grids; `lg` splits the clue editor into question and answer columns. The editor grid enforces a 640px minimum width and scrolls horizontally inside its own container.

## Elevation & Depth

Depth is material, not shadow. Surfaces are layered as stage-deep under stage under stage-floor, with translucent floors (60 to 70%) letting the spotlight gradient show through. Only two things carry drop shadows: brass plates (a soft 18px drop at 70% black, tucked under the bevel) and lit panels (an amber glow of 28px plus a tight 24px black drop). Inset shadows do the real work: a 1px cream highlight on the top edge and a 2px dark line on the bottom edge make brass read as bevelled metal; a 1px inner ring at 40% brass and a 1px cream top highlight make a panel read as a lit acrylic block in a frame.

Brightness, not shadow, signals interaction. Hover on brass and lit panels is `brightness(1.1)`; lit panels also lift by 2px. Pressing a button translates it down 1px. Text on lamplit things glows: cream numerals on lit panels carry an 18px cream halo, the overlay points readout a 24px one.

### Shadow Vocabulary
- **Brass plate** (`inset 0 1px 0 rgba(255,248,220,0.85), inset 0 -2px 0 rgba(60,40,8,0.55), 0 6px 18px -6px rgba(0,0,0,0.7)`): Every brass surface.
- **Brass rim** (`inset 0 1px 0 rgba(243,220,147,0.25), inset 0 -1px 0 rgba(0,0,0,0.5)` with a 1px 55% brass border): Dark cards, outline buttons, inputs, plaques.
- **Panel lit** (`inset 0 1px 0 rgba(255,226,163,0.35), inset 0 0 0 1px rgba(212,166,72,0.4), 0 0 28px -4px lamp-glow, 0 10px 24px -14px rgba(0,0,0,0.9)`): Unused points panels.
- **Panel unlit** (`inset 0 0 0 1px rgba(212,166,72,0.14)`): Used points panels. No glow, no text shadow.
- **Bib dot** (`0 0 {size}px {bib}66`): The coloured halo around a team dot.
- **Team underline** (`inset 0 -3px 0 {bib}`): The team colour stripe along the bottom of a non-leading plaque.
- **Photo** (`drop-shadow(0 20px 40px rgba(0,0,0,0.6))`): Clue images on the big screen.

### Named Rules
**The Lit-Or-Dark Rule.** A points panel is either fully lit (glow, halo, cream) or fully dark (flat, faint, no shadow). There is no half state; the transition between them is 300ms on the stage ease.

**The Glow Belongs To Light Rule.** Only things that emit light in the studio glow: lit panels, the lamp readout, bib dots, the flash on a plaque that just scored. Brass reflects, it does not glow.

## Shapes

Corners are barely rounded and follow the material. Brass plates and acrylic panels use 4px (`rounded-sm`), which reads as a machined edge. Controls, cards, inputs and plaques use 6px (`rounded-md`). Small inner controls like award buttons and the stepper's plus and minus use Tailwind's bare `rounded` (4px). Bib dots, the colour picker circles, the status dots and the scrollbar thumb are fully round. The QR paper inside the room-code plate uses a one-off 3px.

Borders are thin and brass: 1px at 55% for rims, 1px at 40% for landing section dividers, dashed at 40% for the image drop zone, 20% for the remote's footer divider. There are no thick strokes and no borders in cream or white. Focus is a 2px brass-light outline offset 3px, drawn outside the shape. Selection rings (editor tile, chosen team colour) are 2px brass-light.

The recurring silhouette is a wide, short rectangle: a nameplate over a ladder of panels over a row of plaques. The landing hero repeats it in miniature as a six-step lit ladder with one dark rung.

## Components

### Buttons
- **Character:** Podium controls. Flat-faced, 48px tall, 17px Jost with wide tracking, never uppercase.
- **Shape:** 6px corners, 20px side padding, gap 8px between icon and label. Large variant is 56px tall with 28px padding at 1.125rem.
- **Brass (primary):** Brass-plate gradient with brass-ink text, semibold. Used for the one main action per view: "Lag et brett", "Start spill", "Lukk og tilbake til brettet", the active tab.
- **Outline:** Brass rim over stage-floor at 60%, cream text. Secondary actions: "Koble til med romkode", "Legg til lag", "+ Kategori", and the phone's "Vis svar på skjermen".
- **Ghost:** Cream-dim text, no border, hovers to cream on a 5% white wash. Tertiary and escape actions: "Angre", "Tilbake", "Fjern", "Lukk".
- **Velvet:** Velvet material with cream text, semibold. Only for the destructive confirm "Ja, nullstill".
- **Hover / Active / Disabled:** Brass and velvet brighten 10%; all press down 1px; disabled drops to 40 to 50% opacity and loses hover. Transitions run 200ms on transform, filter, background and colour.
- **Deliberate exception:** The big screen's "Vis svar" is intentionally small (outline style, `clamp(0.9rem, 1.1vw, 1.1rem)`, bottom right) because the whole overlay is the tap target and the host normally advances from the phone. Its answer-phase sibling "Lukk" is brass.

### Plates (brass nameplates)
- **Style:** Brass-plate gradient, 4px corners, 8px 16px padding, Bodoni 600 with 0.025em tracking in brass-ink, with a 1px pale text-shadow that reads as engraving.
- **Where:** Category headers on every board (big screen, board preview, editor, phone mini board), the room-code plate (uppercase label at 0.65rem over a bold spaced numeral, with a 44px QR on cream paper), the category chip in the clue overlay and clue editor, the active tab, the leader's podium plaque, the wordmark "J" square.
- **Editable plate:** In the editor the category title is a transparent input inside the plate; focus adds a 15% black wash. Move and delete controls sit under it in brass-ink at 28px height.

### Panels (points)
- **Lit:** Brown-amber vertical gradient with an amber radial underglow, cream numeral with an 18px halo, brass inner ring, outer lamp glow. Hover lifts 2px and brightens.
- **Unlit:** Flat panel-unlit with a 14% brass inner ring, cream-faint numeral, no glow. Hover only warms the numeral to cream-dim.
- **Active:** The opened panel fades to zero opacity while the overlay covers the board.
- **Sizes:** Big screen fills the grid cell; landing ladder 56px tall at 1.875rem; board preview 48px to 64px; editor tile a minimum 80px tall with the numeral top-left and a two-line clue preview beneath; phone mini board 48px minimum with 1rem numerals and long-press to toggle used.

### Podium plaques (scoreboard)
- **Style:** 6px corners, 16px side and 12px vertical padding, bib dot plus team name in Bodoni over a large tabular score. Non-leaders are brass-rim over stage-floor at 70% with the team colour as a 3px inset underline. The sole leader becomes a full brass plate.
- **Behaviour:** Scores roll to the new value over 700ms with a cubic ease-out. A plaque whose score just changed flashes a 40px cream glow for 900ms. Compact variant (phone) is two columns with 12px dots and 1.875rem scores.

### Cards / Containers
- **Corner Style:** 6px.
- **Background:** Stage-floor at 60 to 70% for content cards (answer card, my-boards items, team editor, clue editor); stage-deep at 40 to 70% for form-like containers (share link box, demo checkbox, tab list, stepper).
- **Border:** Brass rim, always. No shadow beyond the rim insets.
- **Internal Padding:** 12px to 16px for rows, 16px for boxes, 20px to 24px for the clue editor. The answer card on the big screen pads `2vh` and holds at least `32vh` when it has no image.

### Inputs / Fields
- **Style:** Brass rim on stage-deep at 70%, 6px corners, 16px side and 12px vertical padding, 17px Jost in cream, placeholders in cream-faint. Textareas start at 96px tall and resize vertically.
- **Label:** Uppercase 0.875rem Jost in brass with 0.18em tracking, 8px above the control; a hint in cream-dim sits 8px below.
- **Focus:** Background deepens to solid stage-deep; the global 2px brass-light outline appears 3px outside; caret is brass-light.
- **Specialised:** The board title input keeps the field style but sets Bodoni at 1.875rem. The room-code field is centred 3rem bold numerals with 0.3em tracking. The stepper is a rimmed box with 48px plus and minus targets around a 1.5rem numeral. Checkboxes use the brass accent colour. The image drop zone is a dashed 40% brass border on stage-deep at 40%, at least 144px tall.
- **Error:** Messages in bib-red; blocking errors sit in a bib-red wash at 12 to 20% with 6px corners.

### Navigation
- **Site header:** Wordmark (brass "J" plate at 36px plus "Jeopardy" in Bodoni 1.5rem, hovering to brass-light) left, a slot of ghost links and one brass button right, 15px Jost. Ghost links are cream-dim hovering to cream.
- **Remote tabs:** A two-cell segmented control in a rimmed stage-deep box with 4px padding. The active tab is a brass plate; the inactive is cream-dim. Labels are 15px uppercase semibold with 0.16em tracking. When a clue is open the "Spill" tab is forced.
- **Big-screen keyboard map:** Arrows move between panels, Enter or Space opens and advances, Esc cancels or closes, U undoes, Q toggles the QR overlay, F toggles fullscreen.

### Phone active clue
The remote mirrors the overlay in miniature: category plate and lamp points on one line, then a rimmed stage-floor card. During the question phase the card shows the question in Jost (`clamp(1.6rem, 7vw, 3rem)`) and, below a 25% brass hairline, a host-only crib: an 11px uppercase brass label with 0.3em tracking ("Svar · bare du ser dette"), an optional answer thumbnail capped at 112px, and the answer in Bodoni brass-light at `clamp(1.25rem, 5vw, 1.9rem)`. In the answer phase the question dims and the answer takes over at `clamp(2rem, 9vw, 3.6rem)`. Below the card, a one-third ghost and two-thirds outline pair ("Feil rute? Tilbake" and "Vis svar på skjermen") in the question phase; award rows and a ghost plus brass pair in the answer phase.

### Clue overlay (signature)
The reveal is the memorable moment. Opening a panel scales the full stage overlay in over 420ms. The header carries the category on a brass plate and the points in lamp with a halo. The question fills the middle in monumental Jost, and the whole area is one button that advances. On "Vis svar" the question shrinks to cream-dim above and the answer card slides up like an envelope over 520ms: a rimmed stage-floor card holding the answer in Bodoni brass-light, or a photo that develops from blurred and dark to sharp over 1100ms. Award controls appear beneath as one rimmed chip per team with green and red numeral buttons. The QR overlay uses the same spotlight-in over a 92% stage-deep blurred scrim, a brass frame around cream paper with a 280px code, and closes on any click.

### Motion
- **Ease:** One curve for everything, `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Durations:** 200ms button state, 300ms panel lit-to-dark, 420ms spotlight-in, 520ms envelope, 700ms score roll, 900ms flash, 1100ms develop.
- **Reduced motion:** All keyframe animations are removed and transitions collapse to near zero. Score rolling completes in one frame.

## Do's and Don'ts

### Do:
- **Do** build every new page on the stage-spotlight background inside a `min-h-dvh` flex column with the site header, and let the spotlight pool sit at the top.
- **Do** paint anything named or titled on a brass plate with engraved brass-ink Bodoni, and anything counted on a lit panel or plaque in tabular Jost.
- **Do** size big-screen text with `clamp()` against viewport width so it survives a 5x6 board on a TV at 2 to 5 metres; clue text may reach 7.2rem.
- **Do** keep controls at least 48px tall (`tap`) on any surface a host touches, and 56px for the one primary action on a view.
- **Do** use exactly one brass button per view; every other action is outline or ghost.
- **Do** mark state with light: lit versus unlit panels, the flash on a changed plaque, the green dot for a live connection.
- **Do** show all UI copy in Norwegian bokmål with verb-first host labels.

### Don't:
- **Don't** use blue as any surface, link or focus colour; blue exists only as the team bib.
- **Don't** use pure white anywhere; the light in this studio is cream.
- **Don't** flatten brass into a solid fill or a tinted border on a plate; plates use the bevelled gradient and rims use the 55% brass hairline.
- **Don't** add velvet red outside the stage bleed and the reset confirmation.
- **Don't** add drop shadows to cards, inputs or buttons; depth comes from inset highlights and translucent floors, and only lit things glow.
- **Don't** put Bodoni on a button or a numeral, or Jost on a nameplate.
- **Don't** let the big-screen board scroll, wrap category plates past two lines, or introduce a second animation ease.
- **Don't** write code comments in this repository; the design is carried by tokens, utilities and this document.
