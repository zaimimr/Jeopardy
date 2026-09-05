import { shortId } from "./game";
import type { BoardContent, Category, Clue, Media } from "./types";

export const DEFAULT_COLUMNS = 5;
export const DEFAULT_ROWS = 6;
export const MAX_COLUMNS = 8;
export const MAX_ROWS = 8;
export const POINT_STEP = 100;

export const createClue = (points: number): Clue => ({
  id: shortId(),
  points,
  question: {},
  answer: {},
});

export const createCategory = (title: string, rows: number): Category => ({
  id: shortId(),
  title,
  clues: Array.from({ length: rows }, (_, index) => createClue((index + 1) * POINT_STEP)),
});

export const createEmptyContent = (columns = DEFAULT_COLUMNS, rows = DEFAULT_ROWS): BoardContent => ({
  categories: Array.from({ length: columns }, (_, index) => createCategory(`Kategori ${index + 1}`, rows)),
});

export const hasMedia = (media: Media) => Boolean(media.text?.trim() || media.image);

export const clueIsFilled = (clue: Clue) => hasMedia(clue.question) && hasMedia(clue.answer);

export const boardRows = (content: BoardContent) =>
  content.categories.reduce((max, category) => Math.max(max, category.clues.length), 0);

export const countFilled = (content: BoardContent) => {
  let filled = 0;
  let total = 0;
  for (const category of content.categories) {
    for (const clue of category.clues) {
      total += 1;
      if (clueIsFilled(clue)) filled += 1;
    }
  }
  return { filled, total };
};

const cleanMedia = (value: unknown): Media => {
  if (!value || typeof value !== "object") return {};
  const candidate = value as Record<string, unknown>;
  const media: Media = {};
  if (typeof candidate.text === "string" && candidate.text.trim()) media.text = candidate.text.slice(0, 2000);
  if (typeof candidate.image === "string" && /^https?:\/\//.test(candidate.image)) media.image = candidate.image.slice(0, 1000);
  return media;
};

export const sanitizeContent = (value: unknown): BoardContent => {
  if (!value || typeof value !== "object") return createEmptyContent();
  const raw = (value as Record<string, unknown>).categories;
  if (!Array.isArray(raw)) return createEmptyContent();
  const categories: Category[] = raw.slice(0, MAX_COLUMNS).map((entry, columnIndex) => {
    const record = (entry ?? {}) as Record<string, unknown>;
    const rawClues = Array.isArray(record.clues) ? record.clues.slice(0, MAX_ROWS) : [];
    return {
      id: typeof record.id === "string" && record.id ? record.id.slice(0, 32) : shortId(),
      title: typeof record.title === "string" ? record.title.slice(0, 60) : `Kategori ${columnIndex + 1}`,
      clues: rawClues.map((clueEntry, rowIndex) => {
        const clue = (clueEntry ?? {}) as Record<string, unknown>;
        const points = Number(clue.points);
        return {
          id: typeof clue.id === "string" && clue.id ? clue.id.slice(0, 32) : shortId(),
          points: Number.isFinite(points) ? Math.trunc(points) : (rowIndex + 1) * POINT_STEP,
          question: cleanMedia(clue.question),
          answer: cleanMedia(clue.answer),
        };
      }),
    };
  });
  return { categories };
};
