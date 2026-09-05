"use client";

import { useCallback, useEffect, useState } from "react";

export type LocalBoard = { id: string; title: string; key: string; savedAt: number };

const STORAGE_KEY = "jeopardy.boards";

const read = (): LocalBoard[] => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as LocalBoard[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const write = (boards: LocalBoard[]) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(boards));
  } catch {
    return;
  }
};

export const rememberBoard = (board: Omit<LocalBoard, "savedAt">) => {
  const others = read().filter((entry) => entry.id !== board.id);
  write([{ ...board, savedAt: Date.now() }, ...others].slice(0, 30));
};

export const forgetBoard = (id: string) => write(read().filter((entry) => entry.id !== id));

export const localBoardKey = (id: string) => read().find((entry) => entry.id === id)?.key ?? null;

export function useLocalBoards() {
  const [boards, setBoards] = useState<LocalBoard[]>([]);
  const [ready, setReady] = useState(false);
  const refresh = useCallback(() => {
    setBoards(read());
    setReady(true);
  }, []);
  useEffect(() => {
    refresh();
  }, [refresh]);
  return { boards, ready, refresh };
}
