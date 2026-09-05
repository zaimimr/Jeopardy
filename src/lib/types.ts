import type { ThemeId } from "./themes";

export type Media = {
  text?: string;
  image?: string;
};

export type Clue = {
  id: string;
  points: number;
  question: Media;
  answer: Media;
};

export type Category = {
  id: string;
  title: string;
  clues: Clue[];
};

export type BoardContent = {
  categories: Category[];
  theme?: ThemeId;
};

export type Board = {
  id: string;
  title: string;
  subtitle: string | null;
  content: BoardContent;
  createdAt: string;
  updatedAt: string;
};

export const BIB_COLORS = ["yellow", "green", "red", "blue", "white", "purple", "orange", "pink"] as const;
export type BibColor = (typeof BIB_COLORS)[number];

export type Team = {
  id: string;
  name: string;
  color: BibColor;
  score: number;
};

export type ScoreEvent = {
  id: string;
  teamId: string;
  delta: number;
  clueId: string | null;
  at: number;
};

export type CluePhase = "question" | "answer";

export type GameState = {
  teams: Team[];
  used: string[];
  active: { clueId: string; phase: CluePhase } | null;
  log: ScoreEvent[];
};

export type GameAction =
  | { type: "openClue"; clueId: string }
  | { type: "showAnswer" }
  | { type: "showQuestion" }
  | { type: "closeClue" }
  | { type: "cancelClue" }
  | { type: "toggleUsed"; clueId: string }
  | { type: "award"; teamId: string; delta: number; clueId?: string | null }
  | { type: "undo" }
  | { type: "addTeam"; name?: string }
  | { type: "renameTeam"; teamId: string; name: string }
  | { type: "removeTeam"; teamId: string }
  | { type: "setTeamColor"; teamId: string; color: BibColor }
  | { type: "setScore"; teamId: string; score: number }
  | { type: "reset" };

export type Game = {
  id: string;
  code: string;
  boardId: string;
  state: GameState;
  version: number;
};

export type GameWithBoard = Game & { board: Board };
