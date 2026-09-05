import { BIB_COLORS, type BibColor, type Board, type Clue, type GameAction, type GameState, type Team } from "./types";

export const MAX_TEAMS = 8;

export const shortId = () => Math.random().toString(36).slice(2, 9);

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ";

export const randomCode = (length = 4) =>
  Array.from({ length }, () => CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)]).join("");

export const normalizeCode = (raw: string) => raw.trim().toUpperCase().replace(/[^A-Z]/g, "").slice(0, 6);

export const defaultTeamName = (index: number) => `Lag ${index + 1}`;

const nextColor = (teams: Team[]): BibColor =>
  BIB_COLORS.find((color) => !teams.some((team) => team.color === color)) ?? BIB_COLORS[teams.length % BIB_COLORS.length];

export const createTeam = (teams: Team[], name?: string): Team => ({
  id: shortId(),
  name: name?.trim() || defaultTeamName(teams.length),
  color: nextColor(teams),
  score: 0,
});

export const createInitialState = (): GameState => {
  const teams: Team[] = [];
  teams.push(createTeam(teams));
  teams.push(createTeam(teams));
  return { teams, used: [], active: null, log: [] };
};

export const findClue = (board: Board, clueId: string): { clue: Clue; categoryTitle: string } | null => {
  for (const category of board.content.categories) {
    const clue = category.clues.find((candidate) => candidate.id === clueId);
    if (clue) return { clue, categoryTitle: category.title };
  }
  return null;
};

export const rankedTeams = (teams: Team[]) =>
  [...teams].sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, "nb"));

export const reduceGame = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "openClue":
      return { ...state, active: { clueId: action.clueId, phase: "question" } };
    case "showAnswer": {
      if (!state.active) return state;
      const used = state.used.includes(state.active.clueId) ? state.used : [...state.used, state.active.clueId];
      return { ...state, used, active: { ...state.active, phase: "answer" } };
    }
    case "showQuestion":
      return state.active ? { ...state, active: { ...state.active, phase: "question" } } : state;
    case "closeClue": {
      if (!state.active) return state;
      const used = state.used.includes(state.active.clueId) ? state.used : [...state.used, state.active.clueId];
      return { ...state, used, active: null };
    }
    case "cancelClue":
      return state.active ? { ...state, active: null } : state;
    case "toggleUsed":
      return {
        ...state,
        used: state.used.includes(action.clueId)
          ? state.used.filter((id) => id !== action.clueId)
          : [...state.used, action.clueId],
      };
    case "award": {
      if (!state.teams.some((team) => team.id === action.teamId) || action.delta === 0) return state;
      return {
        ...state,
        teams: state.teams.map((team) =>
          team.id === action.teamId ? { ...team, score: team.score + action.delta } : team,
        ),
        log: [
          ...state.log.slice(-199),
          { id: shortId(), teamId: action.teamId, delta: action.delta, clueId: action.clueId ?? null, at: Date.now() },
        ],
      };
    }
    case "undo": {
      const last = state.log.at(-1);
      if (!last) return state;
      return {
        ...state,
        teams: state.teams.map((team) =>
          team.id === last.teamId ? { ...team, score: team.score - last.delta } : team,
        ),
        log: state.log.slice(0, -1),
      };
    }
    case "addTeam":
      if (state.teams.length >= MAX_TEAMS) return state;
      return { ...state, teams: [...state.teams, createTeam(state.teams, action.name)] };
    case "renameTeam": {
      const name = action.name.trim().slice(0, 24);
      if (!name) return state;
      return { ...state, teams: state.teams.map((team) => (team.id === action.teamId ? { ...team, name } : team)) };
    }
    case "removeTeam":
      if (state.teams.length <= 1) return state;
      return {
        ...state,
        teams: state.teams.filter((team) => team.id !== action.teamId),
        log: state.log.filter((event) => event.teamId !== action.teamId),
      };
    case "setTeamColor":
      return {
        ...state,
        teams: state.teams.map((team) => (team.id === action.teamId ? { ...team, color: action.color } : team)),
      };
    case "setScore":
      return {
        ...state,
        teams: state.teams.map((team) =>
          team.id === action.teamId ? { ...team, score: Math.trunc(action.score) } : team,
        ),
      };
    case "reset":
      return {
        ...state,
        teams: state.teams.map((team) => ({ ...team, score: 0 })),
        used: [],
        active: null,
        log: [],
      };
    default:
      return state;
  }
};

export const isGameState = (value: unknown): value is GameState => {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return Array.isArray(candidate.teams) && Array.isArray(candidate.used) && Array.isArray(candidate.log);
};
