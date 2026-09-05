"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { dispatchGameAction, getGameState } from "@/lib/actions/games";
import { reduceGame } from "@/lib/game";
import { supabaseBrowser } from "@/lib/supabase/browser";
import type { Game, GameAction } from "@/lib/types";

export type SyncStatus = "connecting" | "live" | "polling";

type Broadcast = { state: Game["state"]; version: number; origin: string };

const POLL_MS = 4000;

export function useGame(initial: Game) {
  const [game, setGame] = useState<Game>(initial);
  const [status, setStatus] = useState<SyncStatus>("connecting");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(0);
  const versionRef = useRef(initial.version);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const originRef = useRef(Math.random().toString(36).slice(2));

  const accept = useCallback((incoming: Game) => {
    if (incoming.version <= versionRef.current) return;
    versionRef.current = incoming.version;
    setGame(incoming);
  }, []);

  useEffect(() => {
    const supabase = supabaseBrowser();
    if (!supabase) {
      setStatus("polling");
      return;
    }
    const channel = supabase.channel(`game:${initial.code}`, { config: { broadcast: { self: false } } });
    channel
      .on("broadcast", { event: "state" }, ({ payload }) => {
        const message = payload as Broadcast;
        if (message.origin === originRef.current) return;
        accept({ code: initial.code, boardId: initial.boardId, state: message.state, version: message.version });
      })
      .subscribe((state) => {
        if (state === "SUBSCRIBED") setStatus("live");
        else if (state === "CHANNEL_ERROR" || state === "TIMED_OUT" || state === "CLOSED") setStatus("polling");
      });
    channelRef.current = channel;
    return () => {
      channelRef.current = null;
      supabase.removeChannel(channel);
    };
  }, [initial.code, initial.boardId, accept]);

  useEffect(() => {
    let cancelled = false;
    const poll = async () => {
      if (document.visibilityState === "hidden") return;
      try {
        const latest = await getGameState(initial.code);
        if (!cancelled && latest) accept(latest);
      } catch {
        return;
      }
    };
    const interval = window.setInterval(poll, status === "live" ? POLL_MS * 4 : POLL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") void poll();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
    };
  }, [initial.code, status, accept]);

  const dispatch = useCallback(
    async (action: GameAction) => {
      setGame((current) => ({ ...current, state: reduceGame(current.state, action) }));
      setPending((count) => count + 1);
      setError(null);
      try {
        const result = await dispatchGameAction(initial.code, action);
        accept(result);
        channelRef.current?.send({
          type: "broadcast",
          event: "state",
          payload: { state: result.state, version: result.version, origin: originRef.current } satisfies Broadcast,
        });
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "Noe gikk galt.");
        try {
          const latest = await getGameState(initial.code);
          if (latest) {
            versionRef.current = 0;
            accept(latest);
          }
        } catch {
          return;
        }
      } finally {
        setPending((count) => count - 1);
      }
    },
    [initial.code, accept],
  );

  return { game, dispatch, status, error, pending: pending > 0 };
}
