# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Next.js (App Router, TypeScript, Tailwind) on Vercel, Supabase for Postgres, Storage (photos) and Realtime (phone-to-screen sync). User confirmed Vercel hosting and Supabase Realtime; framework choice left to us.

## Users

- **Host** (first: Zaim, running a Jeopardy night for his aunt Kanwal's birthday). Builds the board in advance on a laptop, then on the night runs the game from a phone while the board shows on a PC connected to a TV. Standing in a living room, half attention on the screen, half on guests.
- **Guests/teams**: 2-6 teams of family and friends, reading the board from across the room. Never touch the software.
- **Future hosts**: anyone who wants to make their own Jeopardy board for a party. No account required.

## Product Purpose

Let anyone build a custom Jeopardy board (categories x clues, text and/or photo for both question and answer) and run it live at a party: big-screen board on one device, remote control on the host's phone, live team scores. Success on the night: nobody fights the software, every reveal is legible from the sofa, scores are never disputed because they are always visible.

## Positioning

Two-device play built in: the board on the TV and the remote on the phone are the same game, kept in sync through a short room code and a QR scan. Photo answers are first-class, not an afterthought. No accounts, no install.

## Operating Context

- Building: laptop, quiet evening before the party. Editor must handle flexible grid sizes (default 5 categories x 6 clues, adjustable), photo upload, point values.
- Playing: PC browser fullscreen on a TV, 2-5 meters viewing distance, room lighting dim to normal. Phone in host's hand, one-thumb use, possibly on mobile data while the PC is on wifi.
- Between sessions: board and game state must survive a browser refresh on either device.

## Capabilities and Constraints

- Boards stored in Postgres. A board has a title, ordered categories, and per category an ordered list of clues. Each clue: points, question (text and/or image), answer (text and/or image).
- Ownership without login: creating a board issues a secret edit key. The edit link (with key) is stored in the creator's browser and can be copied. Anyone with the board's public link can start a game from it.
- A game is a session of a board: 4-letter room code, teams (name, colour, score), used clues, currently open clue and its phase (question shown / answer shown). Teams can be added, renamed and removed from the phone before and during play.
- Scoring: award or deduct a clue's points to any team, undo last action. Score always visible on the board.
- Sync: game state lives in the database; both devices subscribe to changes via Supabase Realtime, with a polling fallback. The board page is also clickable so the game can be run without a phone.
- Language: all UI copy in Norwegian bokmål. Never nynorsk.
- Deployment: Vercel with a custom domain. Env vars: Supabase URL, anon key, service role key.
- Undecided: Daily Double / final round (not requested; leave out for v1). Sound effects (not requested).

## Brand Commitments

- Working name: "Jeopardy" (GitHub repo `zaimimr/Jeopardy`, public). No logo yet.
- The first board is for Kanwal's birthday; the product itself is neutral, not birthday-specific. Festive tone comes from content and from the game world, not from birthday chrome.
- Voice: short, warm, direct Norwegian. Host-facing labels are verbs ("Vis svar", "Gi poeng").

## Evidence on Hand

- No real questions or photos yet. Ship a seeded demo board with synthetic Norwegian clues, clearly labelled as example content. Do not invent facts about Kanwal.
- No screenshots, testimonials or usage data. Do not fabricate.

## Product Principles

1. Legible from the sofa: the board is read at TV distance, every number and word must survive that.
2. One thumb, no thinking: the phone remote shows only the next sensible actions for the current phase.
3. Never lose the game: refresh, reconnect, or switch device and the state is intact.
4. The board is the show, the tools recede: editor and remote are plain and fast, the big screen carries the atmosphere.
5. Flexible without settings sprawl: grid size, points and teams are edited in place, not in a preferences page.

## Accessibility & Inclusion

- Board contrast must hold at distance and on a mediocre TV: no thin type, no low-contrast decorative text carrying meaning.
- Remote must be usable one-handed on a small phone, tap targets at least 44px.
- Keyboard operable board (arrow keys / enter / escape) for laptop-only use.
