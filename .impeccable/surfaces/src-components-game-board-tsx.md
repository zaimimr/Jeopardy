---
version: 1
slug: "src-components-game-board-tsx"
primary_target: "src/components/game-board.tsx"
related_targets: ["src/app/spill/[code]/page.tsx","src/components/remote.tsx"]
---

Scope: the big-screen game board at /spill/[code] (src/components/game-board.tsx), plus its clue overlay and QR overlay. Visitor mode: Experience (guests watch from the sofa; the host operates via the phone remote or keyboard).

Audience and job: 2-6 teams of family reading points, questions and answers from 2-5 metres on a TV; the host picks clues and awards points. Success: every numeral and answer legible at that distance, scores never in doubt.

Content: board title and subtitle, categories as brass nameplates, points as lit acrylic panels (dark when used), team podium plaques with leader in brass, room code and QR for the remote. Clue overlay: question at monumental size; answer phase shows the question small above the answer large (brass Bodoni), photos develop in.

Constraints: Norwegian bokmål; state comes from useGame (Supabase broadcast + polling); keyboard operable (Enter/Space advance, Esc close, U undo, Q QR, F fullscreen); user asked for very large clue text and a small "Vis svar" control.

Direction and memorable moment: NRK quiz studio (Kvitt eller dobbelt): one warm spotlight on a dark stage, brass, lit ladder. The moment is the reveal: the answer card slides up like an envelope and the photo develops in while the scoreboard plaque re-lights for the winner.

Unresolved: sound effects and a final round were not requested; category header wrapping for very long titles at 8 columns untested.
