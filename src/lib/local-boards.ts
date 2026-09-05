"use client";

import { useSyncExternalStore } from "react";

export type LocalBoard = { id: string; title: string; key: string; savedAt: number };

const STORAGE_KEY = "jeopardy.boards";
const EMPTY: LocalBoard[] = [];
const listeners = new Set<() => void>();
let cachedRaw: string | null | undefined;
let cachedBoards: LocalBoard[] = EMPTY;

const read = (): LocalBoard[] => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw) return cachedBoards;
    cachedRaw = raw;
    const parsed = raw ? (JSON.parse(raw) as LocalBoard[]) : [];
    cachedBoards = Array.isArray(parsed) ? parsed : EMPTY;
    return cachedBoards;
  } catch {
    return cachedBoards;
  }
};

const write = (boards: LocalBoard[]) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(boards));
  } catch {
    return;
  }
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
};

export const rememberBoard = (board: Omit<LocalBoard, "savedAt">) => {
  const others = read().filter((entry) => entry.id !== board.id);
  write([{ ...board, savedAt: Date.now() }, ...others].slice(0, 30));
};

export const forgetBoard = (id: string) => write(read().filter((entry) => entry.id !== id));

export const localBoardKey = (id: string) => read().find((entry) => entry.id === id)?.key ?? null;

export function useLocalBoards() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}
